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
        <span class="window-close" @click="windowClose">
          <el-icon><CloseBold /></el-icon>
        </span>
      </div>
    </div>
    <div class="menu">
      <CustomMenu></CustomMenu>
    </div>
  </div>
</template>

<script>
import { useIpcRenderer } from "@vueuse/electron"
import CustomMenu from "../CustomMenu/index.vue"
import { onUnmounted } from 'vue'

export default{
  components:{
    CustomMenu
  },
  setup(){
    const ipcRenderer = useIpcRenderer();
    const windowMin = ()=>{
      console.log(ipcRenderer);
      ipcRenderer.send("window-min"); // 向主进程通信
    }
    const windowClose = ()=>{
      ipcRenderer.send("window-close"); // 向主进程通信
    }

    onUnmounted(()=>{
      
    })
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
  // height: 8vh;
  // background-color: #3098e2;
  background-color: #2f317c;
  // background-color: #2f317c;
  -webkit-app-region: drag; //事件处可以禁用拖拽区域
  color: white;
  display: flex;
  flex-direction: column;
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
  .menu{
    width: 100%;
    background-color: rgb(231,238,243);
    margin-top:auto;
    border-bottom:2px solid rgb(217, 219, 223);
  }
}
</style>