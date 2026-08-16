<script setup>
// 根组件 - 组装头部、路由视图、底部
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

import { onMounted, onUnmounted } from 'vue'

const handlerContextMenu = (e) => {
  e.preventDefault() // 禁止右键菜单
}
const handlerKeyDown = (e) => {
  // 屏蔽F12
  if (e.key === 'F12') {
    e.preventDefault()
  }
  // 屏蔽 Ctrl+Shift+I / Ctrl+Shift+C / Ctrl+U
  if (e.ctrlKey && e.shiftKey && ['I','C'].includes(e.key)) {
    e.preventDefault()
  }
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault()
  }
}

onMounted(() => {
  document.addEventListener('contextmenu', handlerContextMenu)
  document.addEventListener('keydown', handlerKeyDown)
})
onUnmounted(() => {
  document.removeEventListener('contextmenu', handlerContextMenu)
  document.removeEventListener('keydown', handlerKeyDown)
})  
</script>

<template>
  <div id="app">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>
