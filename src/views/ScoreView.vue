<script setup>
// 成绩详情页面 - 对应原 score.html
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScoreStore } from '@/stores/score'
import { maskName, maskIdCard } from '@/utils/desensitize'

const router = useRouter()
const scoreStore = useScoreStore()

// 成绩数据（由路由守卫保证进入此页时一定有数据）
const scoreData = computed(() => scoreStore.scoreResult)

// scoreRoport 是否为 0
const isScoreRoportZero = computed(() => {
  if (!scoreData.value) return false
  return Number(scoreData.value.scoreRoport) === 0
})

// 脱敏后的姓名
const maskedName = computed(() => {
  if (!scoreData.value) return ''
  return maskName(scoreData.value.uname)
})

// 脱敏后的身份证号
const maskedIdCard = computed(() => {
  if (!scoreData.value) return ''
  return maskIdCard(scoreData.value.idCardl)
})

/**
 * 返回查分首页
 */
const handleBack = () => {
  scoreStore.clearScoreResult()
  router.push('/')
}
</script>

<template>
  <main class="page-main" v-if="scoreData">
    <!-- 面包屑导航 -->
    <div class="main-nav">
      <div class="main-nav-container">
        <a class="main-nav-index-page" href="https://www.neea.edu.cn/html1/folder/1508/113-1.htm">首页</a>
        <span class="main-nav-current-page1">
          >
          <a href="https://cjcx.neea.edu.cn/">成绩查询</a>
        </span>
      </div>
    </div>

    <div class="main-container">
      <!-- 页面标题 -->
      <div class="main-title">
        <span class="exam-type">{{ scoreData.subject }}</span>成绩详情
      </div>

      <!-- 成绩信息 -->
      <div class="main-score">
        <!-- 考生基本信息 -->
        <ul class="score-user-list">
          <li class="score-user-list-item">
            <span class="score-user-name-label">姓名</span>
            <span class="score-user-name-value">{{ maskedName }}</span>
          </li>
          <li class="score-user-list-item">
            <span class="score-id-card-label">证件号码</span>
            <span class="score-id-card-value">{{ maskedIdCard }}</span>
          </li>
          <li class="score-user-list-item">
            <span class="score-school-name-label">学校</span>
            <span class="score-school-name-value">{{ scoreData.school }}</span>
          </li>
          <!-- 成绩报告单编号：scoreRoport 为 0 时隐藏 -->
          <li class="score-user-list-item" v-if="!isScoreRoportZero">
            <span class="score-score-report-label">成绩报告单编号</span>
            <span class="score-score-report-value">{{ scoreData.scoreRoport }}</span>
          </li>
        </ul>

        <!-- 笔试成绩 -->
        <ul class="score-written-list">
          <li class="score-list-title">笔试成绩</li>
          <li class="score-written-list-item">
            <span class="written-exam-num-label">准考证号</span>
            <span class="written-exam-num-value">{{ scoreData.writtenExamNum }}</span>
          </li>
          <li class="score-written-list-item">
            <span class="score-total-label">总分</span>
            <span class="score-total-value">{{ scoreData.writtenTotal }}</span>
          </li>
          <li class="score-written-list-item">
            <span class="score-listening-label">听力</span>
            <span class="score-listening-value">{{ scoreData.writtenListening }}</span>
          </li>
          <li class="score-written-list-item">
            <span class="score-reading-label">阅读</span>
            <span class="score-reading-value">{{ scoreData.writtenReading }}</span>
          </li>
          <li class="score-written-list-item">
            <span class="score-writing-label">写作和翻译</span>
            <span class="score-writing-value">{{ scoreData.writtenWriting }}</span>
          </li>
        </ul>

        <!-- 口试成绩 -->
        <ul class="score-oral-list">
          <li class="score-list-title">口试成绩</li>
          <li class="score-oral-list-item">
            <span class="oral-exam-num-label">准考证号</span>
            <span class="oral-exam-num-value">{{ scoreData.oralExamNum }}</span>
          </li>
          <li class="score-oral-list-item">
            <span class="oral-score-label">成绩</span>
            <span class="oral-level-value">{{ scoreData.oralLevel }}</span>
          </li>
        </ul>
      </div>

      <!-- 注意事项 -->
      <div class="main-notice">
        <span class="main-notice-text-1">
          您在报名期间已选择<span class="is-score-report" v-if="isScoreRoportZero">不</span>需要纸质成绩报告单，<span class="notice-time">{{ scoreData.noticeTime }}</span>可再次登录报名网站（cet-bm.neea.edu.cn）进行修改。
        </span>
      </div>

      <!-- 返回按钮 -->
      <div class="main-btn">
        <button type="button" class="btn-back" @click="handleBack">
          <span>返回</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
// 列表单行样式
@mixin list-item {
  @include flex-item(space-between);
  border-bottom: 0.26666667vmin solid #dadada;
  font-size: 4.26666667vmin;
  line-height: 10vmin;
}

// 列表单行中的值样式
@mixin list-item-value {
  width: 59%;
  text-align: right;
  word-break: break-all;
}

.page-main {
  @media (max-width: $m-width) {
    color: #000;

    // 页面标题
    .main-title {
      margin: 1.2vmin;
      font-size: 4.53333333vmin;
      font-weight: 700;
      line-height: 1.5;
      color: $color-primary;
      text-align: center;
    }

    // 成绩信息
    .main-score {
      // 考生信息
      .score-user-list {
        margin: 3vmin;
        padding: 0 3vmin;
        border-radius: 1.5vmin;
        box-shadow: 0 0 1.8vmin rgb(0 0 0/20%);
        .score-user-list-item {
          @include list-item();
          &:last-child {
            border-bottom: none;
          }
          &:nth-child(-n+3) {
            span:nth-child(1) {
              display: inline-block;
              width: 4em;
              text-align-last: justify;
            }
          }
          & {
            span:nth-child(2) {
              @include list-item-value();
            }
          }
        }
      }

      // 口试成绩、笔试成绩
      .score-oral-list,
      .score-written-list {
        margin: 3vmin;
        padding: 0 3vmin;
        border: 0.26666667vmin solid #c8ddee;
        border-radius: 1.5vmin;
        box-shadow: 0 0 1.8vmin rgb(0 0 0/20%);
        .score-list-title {
          background: #edf3f9;
          margin-left: -3vmin;
          margin-right: -3vmin;
          border-top-right-radius: 1.5vmin;
          border-top-left-radius: 1.5vmin;
          font-size: 4vmin;
          font-weight: 700;
          line-height: 8vmin;
          text-align: center;
          align-items: center;
        }
        li:nth-child(n+2) {
          @include list-item();
          span:nth-child(2) {
            @include list-item-value();
          }
        }
        li:nth-child(n+4) {
          padding-left: 4em;
          span:nth-child(1) {
            display: inline-block;
            width: 5em;
            text-align-last: justify;
          }
          span:nth-child(2) {
            color: #003e7d;
          }
        }
        .oral-score-label,
        .score-total-label {
          display: inline-block;
          width: 4em;
          text-align-last: justify;
        }
        .score-total-value {
          color: red;
        }
        .oral-level-value {
          color: black;
        }
      }
    }

    // 注意事项
    .main-notice {
      margin: 3vmin;
      padding: 3vmin;
      border-radius: 1.5vmin;
      box-shadow: 0 0 1.8vmin rgb(0 0 0/20%);
      font-size: 4vmin;
      color: #a3a3a3;
      text-align: justify;
    }

    // 返回按钮
    .main-btn {
      @include flex-item(center);
      margin: 2vmin 0;
      .btn-back {
        width: 95%;
        height: 10vmin;
        background: $color-primary;
        margin: 0 3vmin;
        border: none;
        border-radius: 1.5vmin;
        font-size: 4vmin;
        line-height: 10vmin;
        color: #fff;
        text-align: center;
        span {
          display: inline-block;
          width: 3em;
          text-align-last: justify;
        }
      }
    }
  }

  @media (min-width: $dt-width) {
    // 页面标题
    .main-title {
      height: 1.875rem;
      margin: 2.5rem 0;
      font-size: 1.375rem;
      line-height: 1.875rem;
      color: #3083c7;
      text-align: center;
    }

    // 成绩信息
    .main-score {
      // 考生信息
      .score-user-list {
        width: 28.125rem;
        margin: .625rem auto;
        font-size: 1rem;
        overflow: hidden;
        .score-user-list-item {
          line-height: 2;
          // 前3项
          &:nth-child(-n+3) {
            span:nth-child(1) {
              display: inline-block;
              width: 4em;
              text-align-last: justify;
            }
          }
          // 添加冒号
          & {
            span:nth-child(1) {
              position: relative;
            }
            span:nth-child(1)::after {
              content: '：';
              position: absolute;
            }
            span:nth-child(2) {
              margin-left: .75rem;
            }
          }
        }
      }

      // 口试成绩、笔试成绩
      .score-oral-list,
      .score-written-list {
        width: 28.125rem;
        margin: auto;
        font-size: 1rem;
        .score-list-title {
          background: #D0E0EE;
          padding: .625rem;
          font-weight: 700;
          text-align: center;
        }
        li:nth-child(n+2) {
          line-height: 2;
          // 添加冒号
          span:nth-child(1) {
            position: relative;
          }
          span:nth-child(1)::after {
            content: '：';
            position: absolute;
          }
          span:nth-child(2) {
            margin-left: .75rem;
          }
        }
        li:nth-child(3) {
          span:nth-child(1) {
            display: inline-block;
            width: 4em;
            text-align-last: justify;
          }
        }
        li:nth-child(n+4) {
          padding-left: 5em;
          span:nth-child(1) {
            display: inline-block;
            width: 5em;
            text-align-last: justify;
          }
          span:nth-child(2) {
            font-style: initial;
            font-weight: 700;
            color: #19407A;
          }
        }
        .score-total-value {
          font-weight: 700;
          color: #FC1200;
        }
      }
    }

    // 注意事项
    .main-notice {
      width: 28.125rem;
      background: #FAFAFA;
      margin: .625rem auto;
      padding: .9375rem;
      border-left: .3125rem solid #D0E0EE;
      border-radius: 0 .125rem .125rem 0;
      font-size: .875rem;
      line-height: 1.6;
    }

    // 返回按钮
    .main-btn {
      margin: 1.875rem 0 0 0;
      text-align: center;
      .btn-back {
        display: inline-block;
        width: 6.25rem;
        height: 2.1875rem;
        background: #32AEEA;
        margin: 0 .3125rem;
        border: none;
        border-radius: .3125rem;
        line-height: 2.1875rem;
        font-size: .875rem;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
