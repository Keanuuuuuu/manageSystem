// 配置vite

import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 @ 符号指向 src 目录
    },
  },
  base: './',
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/globalStyle.scss";`
      }
    }
  }
})
