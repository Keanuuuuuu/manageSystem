<!-- 
* @description: 
* @fileName: changeInfoTitleBar.vue
* @author: 文洋
* @date: 2024-03-04
* @version: 
!-->
<template>
    <div class="main-top" @click="changeInfoDialogWindowMin">
      <div class="left">
        <span>修改信息</span>
      </div>
      <div class="right">
        <span class="window-min" @click="changeInfoDialogWindowMin">
          <el-icon><SemiSelect /></el-icon>
        </span>
        <span class="window-close" @click="changeInfoDialogWindowClose">
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
      const changeInfoDialogWindowMin = ()=>{
        ipcRenderer.send("changeInfoDialog-window-min"); // 向主进程通信
      }
      const changeInfoDialogWindowClose = ()=>{
        ipcRenderer.send("changeInfoDialog-window-close"); // 向主进程通信
      }
  
      return {
        changeInfoDialogWindowMin,
        changeInfoDialogWindowClose
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .main-top {
    width: 100%;
    min-width: 400px;
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