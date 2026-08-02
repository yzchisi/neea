<script setup>
// 查分表单页面 - 对应原 index.html
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScoreStore } from '@/stores/score'

const router = useRouter()
const scoreStore = useScoreStore()

// 科目选项列表
const subjectOptions = [
  { value: 'CET4', text: '全国大学英语四级考试(CET4)' },
  { value: 'CET6', text: '全国大学英语六级考试(CET6)' },
]

// 表单数据
const subjectValue = ref('CET4')
const nameValue = ref('')
const idCardValue = ref('')

// 根据当前选中值计算科目显示文本
const subjectText = computed(() => {
  const option = subjectOptions.find((item) => item.value === subjectValue.value)
  return option ? option.text : ''
})

// 页面加载时获取考生数据
onMounted(() => {
  scoreStore.loadUserInfo()
})

/**
 * 表单提交处理 - 验证并跳转到成绩页
 */
const handleSubmit = () => {
  const name = nameValue.value.trim()
  const idCard = idCardValue.value.trim()

  const result = scoreStore.queryScore(subjectValue.value, subjectText.value, name, idCard)

  if (!result.success) {
    alert(result.message)
    return
  }

  // 查询成功，跳转到成绩页
  router.push('/score')
}

/**
 * 表单重置处理
 */
const handleReset = () => {
  subjectValue.value = 'CET4'
  nameValue.value = ''
  idCardValue.value = ''
}
</script>

<template>
  <main class="page-main">
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
        <span><span class="main-title-text">{{ scoreStore.mainTitle }}</span>全国大学英语四、六级考试（含口试）成绩查询</span>
      </div>

      <!-- 查询表单 -->
      <div class="main-form">
        <form class="form-container" @submit.prevent="handleSubmit" @reset="handleReset">
          <ul>
            <!-- 考试科目 -->
            <li class="form-item">
              <label class="form-item-label" for="subject">考试科目</label>
              <div class="form-item-input">
                <select class="input-subject" id="subject" v-model="subjectValue" required>
                  <option value="CET4">全国大学英语四级考试(CET4)</option>
                  <option value="CET6">全国大学英语六级考试(CET6)</option>
                </select>
              </div>
            </li>

            <!-- 姓名 -->
            <li class="form-item">
              <label class="form-item-label" for="uname">姓名</label>
              <div class="form-item-input">
                <input
                  type="text"
                  class="input-name"
                  id="uname"
                  v-model="nameValue"
                  placeholder="姓名超过3个字，可只输入前3个"
                  maxlength="4"
                  required
                >
              </div>
              <div class="form-item-input-extra">
                <span>部分生僻字和・支持</span>
                <a href="#">快捷输入</a>
              </div>
            </li>

            <!-- 证件号码/准考证号 -->
            <li class="form-item">
              <label class="form-item-label" for="id-card">证件号码/准考证号</label>
              <div class="form-item-input">
                <input
                  type="tel"
                  class="input-id"
                  id="id-card"
                  v-model="idCardValue"
                  placeholder="证件号码或15位笔试、口试准考证号"
                  maxlength="18"
                  required
                >
              </div>
            </li>
          </ul>

          <!-- 按钮组 -->
          <div class="form-btn">
            <button type="submit" class="btn-search">
              <span>查询</span>
            </button>
            <button type="reset" class="btn-reset">
              <span>重置</span>
            </button>
          </div>
        </form>

        <!-- 温馨提示 -->
        <div class="main-form-notice">
          <span>温馨提示:</span>
          <p>1. 若考生的口试成绩为不合格，则成绩报告单上不报道其口试成绩。</p>
          <p>2. 请输入报考时的姓名和证件号码/准考证号进行查询，部分生僻字和" · "支持快捷输入。</p>
        </div>

        <!-- 常见问题（移动端） -->
        <div class="main-form-question">
          <a href="https://cjcx.neea.edu.cn/html1/folder/21083/9978-1.htm">常见问题</a>
          |
          <a href="#">联系我们</a>
        </div>

        <!-- 电脑端输入框说明 -->
        <div class="dt-form-item-input-extra">
          <div class="dt-input-extra-container">
            <div class="extra-top"></div>
            <div class="extra-bot"></div>
            <div class="extra-content">
              <i class="extra-circle-l">
                <i class="extra-circle-s"></i>
              </i>
              <div class="extra-text">
                部分生僻字和"·"支持快捷输入，例：·、䶮、㭎、䜣、𠅤、㼆、仝等，<a href="#">点击打开输入面板。</a>
              </div>
            </div>
          </div>
        </div>

        <!-- 历史成绩查询 -->
        <div class="main-form-history">
          <div class="main-form-history-container">
            <p>查询2005年6月-2025年6月考试成绩，下载2021年6月-2025年6月考试电子成绩报告单（证书）。</p>
            <a href="#">历史成绩查询</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 电脑端侧边栏 -->
    <div class="main-side">
      <div class="main-side-container">
        <!-- 常见问题 -->
        <ul class="main-side-operation">
          <li class="main-side-title">常见问题</li>
          <li class="main-side-item"><span>Q1：忘记准考证号怎么办？</span></li>
          <li class="main-side-item"><span>Q2：为什么笔试成绩为0？</span></li>
          <li class="main-side-item"><span>Q3：如对成绩有异议怎么办？</span></li>
          <li class="main-side-item"><span>Q4：如何获取本次考试电子成绩报告单？</span></li>
          <li class="main-side-item"><span>Q5：如何变更成绩报告单申请种类？</span></li>
        </ul>

        <!-- 操作说明 -->
        <ul class="main-side-question">
          <li class="main-side-title">操作说明</li>
          <li class="main-side-item"><span>1、选择考试项目。</span></li>
          <li class="main-side-item"><span>2、输入姓名和证件号码/准考证号，点击查询按钮进行查询。</span></li>
          <li class="main-side-item"><span>3、如果输入信息正确，对应考试的成绩信息将会在下一个页面列出。</span></li>
          <li class="main-side-item"><span>Q4：电子成绩报告单（证书）的查询和下载是否有期限？</span></li>
        </ul>

        <!-- 联系方式 -->
        <ul class="main-side-contact">
          <li class="main-side-title">联系方式</li>
          <li class="main-side-item">
            <img src="/img/dt-icon-net.png" alt="">
            <span>query@mail.neea.edu.cn</span>
          </li>
          <li class="main-side-item">
            <img src="/img/dt-icon-shouji.png" alt="">
            <span>010-83020302</span>
          </li>
          <li class="main-side-item">
            <img src="/img/dt-icon-shijian.png" alt="">
            <span>工作日 上午:08:30-12:00</span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.page-main {
  // 主体内容区
  .main-container {
    @media (min-width: $dt-width) {
      float: left;
      position: relative;
      width: 51.25rem;
      margin: 0 0 1.875rem 0;
      padding: 0 1.25rem;
      border-right: solid 1px #ddd;
      overflow: hidden;
    }

    // 页面标题
    .main-title {
      @media (max-width: $m-width) {
        margin: 1.2vmin;
        padding: 0 3vmin;
        font-size: 4.53333333vmin;
        font-weight: 700;
        line-height: 1.5;
        color: $color-primary;
        text-align: center;
      }
      @media (min-width: $dt-width) {
        height: 1.875rem;
        margin: 1.875rem 0;
        font-size: 1.375rem;
        color: #3083c7;
        line-height: 1.875rem;
        text-align: center;
      }
    }

    // 页面表单
    .main-form {
      @media (max-width: $m-width) {
        margin: 3vmin;
        padding: 3vmin 3vmin 0;
        border-radius: 1.5vmin;
        box-shadow: 0 0 1.8vmin rgb(0 0 0 / 20%);
      }
      @media (min-width: $dt-width) {
        font-size: .875rem;
      }

      .form-container {
        @media (min-width: $dt-width) {
          width: 32.5rem;
          margin: 0 auto;
        }
      }

      // 输入框
      .form-item {
        @media (max-width: $m-width) {
          margin-bottom: 3.2vmin;
          &:nth-child(2) {
            label {
              width: 4em;
              text-align-last: justify;
            }
          }
        }
        @media (min-width: $dt-width) {
          display: flex;
          float: left;
          position: relative;
          width: 100%;
          margin-bottom: 2.375rem;
          clear: both;
        }

        label {
          display: inline-block;
          @media (max-width: $m-width) {
            font-size: 4.26666667vmin;
            color: #000;
          }
          @media (min-width: $dt-width) {
            float: left;
            position: relative;
            width: 8.25rem;
            height: 1.75rem;
            line-height: 1.75rem;
            text-align: right;
            &:after {
              content: '：';
              position: absolute;
            }
          }
        }

        .form-item-input {
          @media (max-width: $m-width) {
            padding: 2.4vmin 0 1.2vmin;
            border-bottom: 0.26666667vmin solid #dadada;
          }
          @media (min-width: $dt-width) {
            float: left;
            height: 1.875rem;
            margin-left: 1.75rem;
          }

          select {
            @media (max-width: $m-width) {
              width: 100%;
              background: #fff;
              border: none;
              font-size: 4vmin;
              line-height: 5.2vmin;
            }
            @media (min-width: $dt-width) {
              width: 14.875rem;
              height: 1.75rem;
              background: #fff;
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23000' stroke-width='0.9' stroke-linecap='round'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: right 5px center;
              background-size: 8px;
              padding: 0 .3125rem;
              border: solid 1px #A9A9A9;
              border-radius: 3px;
              color: #757575;
            }
            option {
              color: #000;
            }
            &:valid {
              color: #757575;
            }
          }

          .input-name,
          .input-id {
            @media (max-width: $m-width) {
              width: 100%;
              background: #fff;
              border: none;
              font-size: 4vmin;
              color: #333;
              line-height: 5.2vmin;
              &::placeholder {
                font-size: 3.46666667vmin;
                color: #b3b3b3;
              }
            }
            @media (min-width: $dt-width) {
              width: 14.875rem;
              height: 1.75rem;
              background: #fff;
              padding: 0 .3125rem;
              border: solid 1px #a9a9a9;
              border-radius: .3125rem;
              font-size: .8125rem;
              line-height: 1.75rem;
              color: #000;
              &::placeholder {
                font-size: .8125rem;
                color: #b3b3b3;
              }
            }
          }
        }

        .form-item-input-extra {
          @media (max-width: $m-width) {
            margin-top: 0.6vmin;
            font-size: 3.6vmin;
            color: #a3a3a3;
            text-align: right;
            a {
              margin-left: 1.5vmin;
              font-size: 3.6vmin!important;
              color: $color-primary;
            }
          }
          @media (min-width: $dt-width) {
            display: none;
          }
        }
      }

      // 按钮
      .form-btn {
        @media (min-width: $dt-width) {
          clear: both;
          text-align: center;
        }
        button[type="submit"] {
          @media (max-width: $m-width) {
            @include home-form-btn(80%);
            span {
              display: inline-block;
              width: 3em;
              text-align-last: justify;
            }
          }
          @media (min-width: $dt-width) {
            width: 5rem;
            height: 1.875rem;
            background: #01ADEF;
            margin: 0 .3125rem;
            border: 0;
            border-radius: .1875rem;
            line-height: 1.875rem;
            color: #fff;
            text-align: center;
          }
        }
        button[type="reset"] {
          @media (max-width: $m-width) {
            display: none;
          }
          @media (min-width: $dt-width) {
            width: 5rem;
            height: 1.875rem;
            background: #01ADEF;
            margin: 0 .3125rem;
            border: 0;
            border-radius: 3px;
            line-height: 1.875rem;
            color: #fff;
            text-align: center;
          }
        }
      }

      // 电脑 - 输入框说明
      .dt-form-item-input-extra {
        @media (max-width: $m-width) {
          display: none;
        }
        position: absolute;
        left: 35.5rem;
        top: 7.875rem;
        .dt-input-extra-container {
          position: relative;
          width: 14.0625rem;
          // height: 5rem;
          background: #f9fdfe;
          padding: .625rem;
          border: .0625rem solid #beceeb;
          border-radius: .3125rem;
          .extra-top {
            position: absolute;
            left: -1.875rem;
            top: 1.875rem;
            width: 0;
            height: 0;
            border-width: .9375rem;
            border-style: dashed solid dashed dashed;
            border-color: transparent #beceeb transparent transparent;
            font-size: 0;
          }
          .extra-bot {
            position: absolute;
            left: -1.75rem;
            top: 1.875rem;
            width: 0;
            height: 0;
            border-width: .9375rem;
            border-style: dashed solid dashed dashed;
            border-color: transparent #ffffff transparent transparent;
            font-size: 0;
          }
          .extra-content {
            position: relative;
            .extra-circle-l {
              position: absolute;
              top: .3125rem;
              left: 0;
              display: inline-block;
              width: .75rem;
              height: .75rem;
              background: #fff;
              border: 1px solid #5fb5d6;
              border-radius: .75rem;
              line-height: .75rem;
              .extra-circle-s {
                position: absolute;
                left: .125rem;
                top: .125rem;
                width: .375rem;
                height: .375rem;
                background: #5fb5d6;
                border-radius: .375rem;
              }
            }
            .extra-text {
              padding: 0 0 0 1.25rem;
              line-height: 180%;
              font-size: .8125rem;
              color: #666;
              a {
                display: inline-block;
                color: #01adef;
              }
            }
          }
        }
      }

      // 温馨提示
      .main-form-notice {
        @media (max-width: $m-width) {
          margin: 3vmin 0;
          font-size: 3.46666667vmin;
          color: #ff9919;
          text-align: justify;
          div {
            display: none;
          }
        }
        @media (min-width: $dt-width) {
          width: 37.5rem;
          background: #FAFAFA;
          margin: 1.875rem auto;
          padding: .625rem;
          border-left: .3125rem solid #D0E0EE;
          border-radius: 0 .125rem .125rem 0;
          line-height: 1.6;
          span {
            line-height: 1.8;
          }
          p:nth-child(n+3) {
            display: none;
          }
        }
      }

      // 常见问题（移动端）
      .main-form-question {
        border-top: 0.4vmin solid #dadada;
        font-size: 4vmin;
        line-height: 10vmin;
        color: $color-primary;
        text-align: center;
        a {
          color: $color-primary;
        }
        @media (min-width: $dt-width) {
          display: none;
        }
      }

      // 历史成绩查询
      .main-form-history {
        @media (max-width: $m-width) {
          margin: 3vmin 3vmin 6vmin;
          padding: 3vmin;
          border-radius: 1.5vmin;
          p {
            margin: 0 0 3vmin;
            font-size: 4vmin;
            color: black;
            text-align: justify;
          }
          a {
            @include home-form-btn(80%);
          }
        }
        @media (min-width: $dt-width) {
          width: 37.5rem;
          margin: 1.25rem auto;
          &-container {
            padding: .9375rem;
            border: .0625rem solid #ddd;
            p {
              height: 3.25rem;
              font-size: .875rem;
              text-align: justify;
            }
            a {
              display: block;
              width: 7.5rem;
              height: 1.875rem;
              background: #01ADEF;
              margin: auto;
              border-radius: .1875rem;
              font-size: .875rem;
              line-height: 1.875rem;
              color: #fff;
              text-align: center;
            }
          }
        }
      }
    }
  }
}

// 电脑端侧边栏
.main-side {
  @media (max-width: $m-width) {
    display: none;
  }
  float: left;
  width: 20rem;
  margin: 1.25rem 0 0 1.25rem;
  font-size: .875rem;
  color: #404040;
  text-align: left;

  .main-side-contact,
  .main-side-question,
  .main-side-operation {
    border-bottom: 1px solid #dddddd;
    .main-side-title {
      border-bottom-width: medium;
      border-bottom-style: none;
      border-bottom-color: currentcolor;
      margin: .5rem 0 0;
      padding: .5rem 0 1.25rem 1rem;
      font-size: 1.125rem;
      &::before {
        content: "";
        display: inline-block;
        width: .625rem;
        height: .625rem;
        margin-right: 1rem;
        background: #fe8500;
      }
    }
    .main-side-item {
      margin-bottom: 1.25rem;
      padding-left: 1.25rem;
      line-height: 1.25rem;
    }
  }

  .main-side-question {
    .main-side-item {
      cursor: pointer;
    }
  }

  .main-side-contact {
    img {
      vertical-align: middle;
    }
    .main-side-item {
      padding-left: 1rem;
      span {
        margin-left: .5rem;
      }
    }
  }
}
</style>
