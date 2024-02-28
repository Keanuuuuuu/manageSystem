<!-- 
* @description: 找回密码页面上方的自定义titleBar 
* @fileName: index.vue
* @author: 文洋
* @date: 2023-11-09
* @version:1.0 
!-->
<template>
  <div class="main-top">
    <div>
      <div class="left">
        <span>找回密码</span>
      </div>
      <div class="right">
        <span class="window-min" @click="windowMin">
          <el-icon>
            <SemiSelect />
          </el-icon>
        </span>
        <span class="window-close" @click="windowClose">
          <el-icon>
            <CloseBold />
          </el-icon>
        </span>
      </div>
    </div>
  </div>
</template>
  
<script>
import { useIpcRenderer } from "@vueuse/electron"

export default {
  setup() {
    const ipcRenderer = useIpcRenderer();
    const windowMin = () => {
      console.log(ipcRenderer);
      ipcRenderer.send("PWD-min"); // 向主进程通信
    }
    const windowClose = () => {
      ipcRenderer.send("PWD-close"); // 向主进程通信
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
  background-color: $color-theme;
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
      font-size: 14px;
      width: 50px;
      height: 35px;
      line-height: 40px;
      display: inline-block;
      text-align: center;
      -webkit-app-region: no-drag; //事件处可以禁用拖拽区域
      color: white;
    }

    .window-min:hover {
      // background-color: rgb(81, 164, 219);
      background-color: rgb(119, 124, 207);
    }

    .window-close:hover {
      background-color: red;
    }
  }
}</style>