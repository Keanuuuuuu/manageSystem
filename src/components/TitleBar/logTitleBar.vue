<!-- 
* @description: 日志管理titleBar
* @fileName: logTitleBar.vue
* @author: 刘世博
* @date: 2024-01-09
* @version: 
!-->
<template>
  <div class="main-top" @click="logWindowMin">
    <div class="left">
      <span>日志管理</span>
    </div>
    <div class="right">
      <span class="window-min" @click="logWindowMin">
        <el-icon><SemiSelect /></el-icon>
      </span>
      <span class="window-close" @click="logWindowClose">
        <el-icon><CloseBold /></el-icon>
      </span>
    </div>
  </div>
</template>

<script>
import { useIpcRenderer } from "@vueuse/electron"

export default{
  setup(){
    const ipcRenderer = useIpcRenderer();
    const logWindowMin = ()=>{
      ipcRenderer.send("log-window-min"); // 向主进程通信
    }
    const logWindowClose = ()=>{
      ipcRenderer.send("log-window-close"); // 向主进程通信
    }

    return {
      logWindowMin,
      logWindowClose
    }
  }
}
</script>

<style lang="scss" scoped>
.main-top {
  width: 100%;
  min-width: 600px;
  height: 35px;
  background-color: $color-theme;
  -webkit-app-region: drag; //事件处可以禁用拖拽区域
  color: white;
  .left {
    float: left;
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
  }
  .right {
    float: right;
    .window-min,
    .window-close {
      width: 30px;
      height: 35px;
      line-height: 35px;
      display: inline-block;
      text-align: center;
      -webkit-app-region: no-drag; //事件处可以禁用拖拽区域
    }
    .window-min:hover {
      // background-color: rgb(81, 164, 219);
      background-color: rgb(119, 124, 207);
    }
    .window-close:hover {
      background-color: red;
    }
  }
}
</style>