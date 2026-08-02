// 成绩查询状态仓库
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchUserInfo } from '@/api/info'

export const useScoreStore = defineStore('score', () => {
  // 考生信息数据列表
  const userInfoData = ref([])
  // 页面标题（如"2026年上半年"），从 localStorage 恢复，无缓存时使用默认值
  const mainTitle = ref(localStorage.getItem('mainTitle') || '2026年上半年')
  // 成绩查询结果数据
  const scoreResult = ref(null)

  /**
   * 加载考生信息数据
   */
  const loadUserInfo = async () => {
    if (userInfoData.value.length > 0) return
    try {
      userInfoData.value = await fetchUserInfo()
    } catch (err) {
      console.error('获取数据失败:', err)
    }
  }

  /**
   * 验证并查询成绩
   * @param {string} subjectValue - 科目值（如 CET4）
   * @param {string} subjectText - 科目显示文本
   * @param {string} name - 姓名
   * @param {string} idCard - 证件号码/准考证号
   * @returns {{ success: boolean, message: string }} 查询结果
   */
  const queryScore = (subjectValue, subjectText, name, idCard) => {
    // 非空验证
    if (!name || !idCard) {
      return { success: false, message: '请填写完整的考生信息' }
    }

    // 在 userInfo 中查找匹配的考生
    const matchedUser = userInfoData.value.find((user) => {
      const nameMatch = user.uname === name
      const idMatch = user.idCardl === idCard || String(user.writtenExamNum) === idCard
      return nameMatch && idMatch
    })

    if (!matchedUser) {
      return { success: false, message: '考生信息有误，请重新输入' }
    }

    // 检查科目是否匹配
    if (matchedUser.subject !== subjectValue) {
      return { success: false, message: '未查询到成绩信息，请重新选择科目' }
    }

    // 匹配成功，更新 mainTitle 并持久化
    mainTitle.value = matchedUser.mainTitle
    localStorage.setItem('mainTitle', matchedUser.mainTitle)

    // 存储成绩数据到 store（替代原有的 sessionStorage）
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
  }

  /**
   * 清除成绩结果数据
   */
  const clearScoreResult = () => {
    scoreResult.value = null
  }

  return {
    userInfoData,
    mainTitle,
    scoreResult,
    loadUserInfo,
    queryScore,
    clearScoreResult,
  }
})
