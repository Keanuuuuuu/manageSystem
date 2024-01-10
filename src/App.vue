<template>
  <template v-if="$route.path == '/' || $route.path == '/login' ">
    <router-view/>
  </template>

  <template v-else-if="$route.path == '/log' ">
    <router-view/>
  </template>

  <template v-else-if="$route.path == '/findPWD' ">
    <router-view/>
  </template>

  <template v-else>
    <el-config-provider :locale="locale">
      <div class="body">
        <TitleBar></TitleBar>
        <Arti></Arti>
      </div>
    </el-config-provider>
  </template>
</template>

<script>

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import Arti from "./components/arti.vue";
import TitleBar from "./components/TitleBar/mainTitleBar.vue";

import systemEventBus from "@/utils/systemEventBus";
import { useIpcRenderer } from "@vueuse/electron";
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';


export default {
  name: "App",
  components: {
    Arti,
    TitleBar,
    ElConfigProvider
  },
  setup(){
    let route = useRouter();
    let url = ref(false)
    const ipcRenderer = useIpcRenderer();
    onMounted(()=>{
      systemEventBus.$on('showDialog', (res)=>{
        if(res === "日志记载"){
          console.log('///////////////////////////');
          ipcRenderer.send('openDialog',"日志记载")
        }
      })
      // console.log(route.currentRoute.value.path);
      url = route.currentRoute.value.path === '/login' || '/' ? true : false;
      // console.log(url);
    })    
    return{
      locale: zhCn,
      route,
      url
    }
  }
}
</script>

<style lang="scss">
* {
  margin:0;
  // 如果不设置清除样式无法填满背景
}

.body {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100vh;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding-left: calc(100vw - 100%);
  .logo {
    height: 10%; 
    // 顶部logo的高度加上下面Arti组件的高度为100%，例：这里为10%，那Arti整个高度为90%
  }
  .el-row {
    // border: 1px solid black;
    box-sizing: border-box;
    min-width: 1200px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bg-purple-dark {
    background: #E7EEF3;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 50px;
    height: 100%;
  }
  .grid-content1 {
    min-height: 500px;
    height: 100%;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>