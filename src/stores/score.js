// 成绩查询状态仓库
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useScoreStore = defineStore('score', () => {
  // 页面标题（如"2026年上半年"），从 localStorage 恢复，无缓存时使用默认值
  const mainTitle = ref(localStorage.getItem('mainTitle') || '2026年上半年')
  // 成绩查询结果数据
  const scoreResult = ref(null)

  /**
   * 请求后端接口查询成绩（替换原来前端本地匹配逻辑）
   * @param {string} subjectValue - 科目值（如 CET4）
   * @param {string} subjectText - 科目显示文本
   * @param {string} name - 姓名
   * @param {string} idCard - 证件号码/准考证号
   * @returns {{ success: boolean, message: string }} 查询结果
   */
  const queryScore = async (subjectValue, subjectText, name, idCard) => {
    // 非空验证
    if (!name || !idCard) {
      return { success: false, message: '请填写完整的考生信息' }
    }

    try {
      // 请求Cloudflare Pages函数接口
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: subjectValue,
          name: name,
          idcard: idCard
        })
      })

      const result = await res.json()
      if (!result.success) {
        return { success: false, message: result.message }
      }

      const matchedUser = result.data

      // 更新标题并持久化
      mainTitle.value = matchedUser.mainTitle
      localStorage.setItem('mainTitle', matchedUser.mainTitle)

      // 组装成绩结果（字段和页面保持完全一致，页面无需改动）
      scoreResult.value = {
        subject: subjectText,
        subjectValue,
        uname: matchedUser.uname,
        idCardl: matchedUser.idCardl,
        school: matchedUser.school,
        scoreRoport: matchedUser.scoreRoport,
        writtenExamNum: matchedUser.writtenExamNum,
        writtenTotal: matchedUser.writtenTotal,
        writtenListening: matchedUser.writtenListening,
        writtenReading: matchedUser.writtenReading,
        writtenWriting: matchedUser.writtenWriting,
        oralExamNum: matchedUser.oralExamNum,
        oralLevel: matchedUser.oralLevel,
        noticeTime: matchedUser.noticeTime,
      }

      return { success: true, message: '' }

    } catch (err) {
      console.error('查询接口异常：', err)
      return { success: false, message: '网络异常，请稍后重试' }
    }
  }

  /**
   * 清除成绩结果数据
   */
  const clearScoreResult = () => {
    scoreResult.value = null
  }

  return {
    mainTitle,
    scoreResult,
    queryScore,
    clearScoreResult,
  }
})
