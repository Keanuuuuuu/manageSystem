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
  width: 100%;
  -webkit-app-region: drag; //事件处可以禁用拖拽区域
  color: rgba(0, 0, 0, 0.726);
  position: fixed;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

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
      border-top-right-radius: 10px;
    }
  }
}
</style>