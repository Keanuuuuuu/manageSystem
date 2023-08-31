import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import electron from "vite-plugin-electron"
// import electronRenderer from "vite-plugin-electron-renderer" 
// import polyfillExports from "vite-plugin-electron-renderer"  

export default defineConfig({
  plugins: [
    vue(),
    // electronRenderer(),
    // polyfillExports(),
  ],
  // server: {
  //   proxy: {
  //     '/login': {
  //       target: 'http://lab.zhongyaohui.club',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     '/': {
  //       target: 'http://lab.zhongyaohui.club',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   }
  // },
})
