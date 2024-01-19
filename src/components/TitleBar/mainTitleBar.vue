<!-- 
* @description: 主界面的客制化titleBar 
* @fileName: index.vue
* @author: 文洋 刘世博
* @date: 2024-01-09
* @version: 
!-->
<template>
  <div class="main-top">
    <div>
      <div class="left">
        <span>中央空调集中管理平台</span>
      </div>
      <div class="right">
        <span class="window-min" @click="windowMin">
          <el-icon><SemiSelect /></el-icon>
        </span>
        <span class="window-resize" @click="windowResize">
          <el-icon><CopyDocument /></el-icon>
        </span>
        <span class="window-close" @click="windowClose">
          <el-icon><CloseBold /></el-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { useIpcRenderer } from "@vueuse/electron"


export default{
  setup(){
    const ipcRenderer = useIpcRenderer();
    const windowMin = ()=>{
      ipcRenderer.send("window-min"); // 向主进程通信 最小化
    }
    const windowResize = ()=>{
      ipcRenderer.send("window-resize"); // 向主进程通信 调整尺寸
    }
    const windowClose = ()=>{
      ipcRenderer.send("window-close"); // 向主进程通信 关闭
    }
    return {
      windowMin,
      windowResize,
      windowClose
    }
  }
}
</script>

<style lang="scss" scoped>
.main-top {
  width: 100%;
  background-color: $color-theme;
  -webkit-app-region: drag; //事件处可以禁用拖拽区域
  color: white;
  display: flex;
  flex-direction: column;
  .left {
    float: left;
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    font-size: 13.5px;
  }
  .right {
    float: right;
    .window-min,
    .window-resize,
    .window-close {
      font-size: 14px;
      width: 50px;
      height: 35px;
      line-height: 40px;
      display: inline-block;
      text-align: center;
      -webkit-app-region: no-drag; //事件处可以禁用拖拽区域
    }
    .window-resize{
      transform: scale(-1,-1);
      font-size: 13px;
    }
    .window-min:hover,
    .window-resize:hover {
      background-color: rgb(119, 124, 207);
    }
    .window-close:hover {
      background-color: red;
    }
  }
}
</style>