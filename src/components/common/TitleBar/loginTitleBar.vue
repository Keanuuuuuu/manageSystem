<!-- 
* @description: login登录窗口右上角的关闭组件
* @fileName: index.vue
* @author: 文洋
* @date: 2023-11-08
* @version: 1.0
!-->

<template>
  <div class="main-top">
      <div class="right">
        <span class="window-close" @click="windowClose">
          <el-icon>
            <CloseBold />
          </el-icon>
        </span>
      </div>
    </div>
</template>

<script>
import { useIpcRenderer } from "@vueuse/electron"
import CustomMenu from "../CustomMenu/index.vue"

export default {
  components: {
    CustomMenu
  },
  setup() {
    const ipcRenderer = useIpcRenderer();
    const windowClose = () => {
      ipcRenderer.send("login-close"); // 向主进程通信
    }
    return {
      windowClose
    }
  }
}
</script>

<style lang="scss" scoped>
.main-top {
  z-index: 999;
  width: 375px;
  -webkit-app-region: drag; //事件处可以禁用拖拽区域
  color: rgba(0, 0, 0, 0.726);
  position: fixed;
  top: 3px;
  left: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  // border: 1px solid black;

  .right {
    float: right;
    .window-close {
      width: 30px;
      height: 30px;
      line-height: 38px;
      display: inline-block;
      text-align: center;
      -webkit-app-region: no-drag; //事件处可以禁用拖拽区域
    }
    .window-close:hover {
      background-color: red;
      border-top-right-radius: $border-radius;
    }
  }
}
</style>