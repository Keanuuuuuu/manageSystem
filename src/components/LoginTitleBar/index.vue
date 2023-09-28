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
      ipcRenderer.send("login-min"); // 向主进程通信
    }
    const windowClose = ()=>{
      ipcRenderer.send("login-close"); // 向主进程通信
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
  height: 8vh;
  background-color: #3098e2;
  -webkit-app-region: drag; //事件处可以禁用拖拽区域
  color: white;
  position: fixed;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
      background-color: rgb(81, 164, 219);
    }
    .window-close:hover {
      background-color: red;
    }
  }
}
</style>