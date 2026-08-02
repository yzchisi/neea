import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署基础路径，与仓库名一致
  base: '/vue-cet/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动注入变量和混入，组件中无需手动 @use
        additionalData: `
          @use "@/assets/styles/_variables" as *;
          @use "@/assets/styles/_mixin" as *;
        `,
      },
    },
  },
})
