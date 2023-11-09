<template>
    <div class="main-top">
      <div>
        <div class="left">
          <span>忘记密码</span>
        </div>
        <div class="right">
          <span class="window-min" @click="windowMin">
            <el-icon><SemiSelect /></el-icon>
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
        console.log(ipcRenderer);
        ipcRenderer.send("findPWD-min"); // 向主进程通信
      }
      const windowClose = ()=>{
        ipcRenderer.send("findPWD-close"); // 向主进程通信
      }
  
      return {
        windowMin,
        windowClose
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .main-top {
    width: 100%;
    min-width: 1200px;
    background-color: rgb(98,106,239);
    -webkit-app-region: drag; //事件处可以禁用拖拽区域
    display: flex;
    flex-direction: column;
    .left {
      float: left;
      height: 35px;
      line-height: 35px;
      padding-left: 15px;
      color: white;
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