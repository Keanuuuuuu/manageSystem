<template>
  <div class="main-top">
    <div class="right">
      <span class="window-min" @click="windowMin">
        <el-icon><SemiSelect /></el-icon>
      </span>
      <span class="window-close" @click="windowClose">
        <el-icon><CloseBold /></el-icon>
      </span>
    </div>
    <div class="menu">
      <CustomMenu></CustomMenu>
    </div>
  </div>
</template>

<script>
import { useIpcRenderer } from "@vueuse/electron"
import CustomMenu from "../CustomMenu/index.vue"

export default{
  components:{
    CustomMenu
  },
  setup(){
    const ipcRenderer = useIpcRenderer();
    const windowMin = ()=>{
      // remote.ipcRenderer.send("window-min")
      console.log(ipcRenderer);
      ipcRenderer.send("window-min"); // 向主进程通信
    }
    const windowClose = ()=>{
      ipcRenderer.send("window-close"); // 向主进程通信
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
  // height: 60px;
  background-color: #179bbb;
  -webkit-app-region: drag; //事件处可以禁用拖拽区域
  color: white;
  .left {
    float: left;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
  }
  .right {
    float: right;
    .window-min,
    .window-close {
      width: 30px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      text-align: center;
      -webkit-app-region: no-drag; //事件处可以禁用拖拽区域
    }
    .window-min:hover {
      background-color: rgb(209, 207, 207);
    }
    .window-close:hover {
      background-color: red;
    }
  }
}
</style>