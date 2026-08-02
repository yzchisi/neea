import { createRouter, createWebHashHistory } from 'vue-router'
import { useScoreStore } from '@/stores/score'

const router = createRouter({
  // 使用 Hash 模式，GitHub Pages 纯静态服务器不支持 History 模式路由回退
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/score',
      name: 'score',
      component: () => import('@/views/ScoreView.vue'),
      // 路由导航守卫：无成绩数据时拦截进入，直接跳转回首页
      beforeEnter: () => {
        const scoreStore = useScoreStore()
        if (!scoreStore.scoreResult) {
          return { name: 'home' }
        }
      },
    },
  ],
  // 路由切换时滚动到页面顶部
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
