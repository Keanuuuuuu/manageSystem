<template>
  <template v-if="$route.path == '/' || $route.path == '/login'">
    <LoginTitleBar></LoginTitleBar>
    <router-view />
  </template>

  <template v-else-if="$route.path == '/log'">
    <router-view />
  </template>

  <template v-else-if="$route.path == '/findPWD'">
    <router-view />
  </template>

  <template v-else>
    <div class="body">
      <TitleBar></TitleBar>
      <CustomMenu></CustomMenu>
      <!-- <Menu></Menu> -->
      <Navigator :routes="routes" :currentRoute="currentRoute"></Navigator>
      <router-view></router-view>
    </div>
  </template>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";


import Navigator from "@/components/Navigator.vue";
import LoginTitleBar from '@/components/TitleBar/loginTitleBar.vue'
import TitleBar from "@/components/TitleBar/mainTitleBar.vue";

import CustomMenu from "@/components/CustomMenu/index.vue"
import Menu from '@/components/Menu/index.vue'

import systemEventBus from "@/utils/systemEventBus";
import { useIpcRenderer } from "@vueuse/electron";


export default {
  name: "App",
  components: {
    Navigator,
    TitleBar,
    LoginTitleBar,
    Menu,
    CustomMenu
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    currentRoute() {
      return this.$route;
    },
  },
  setup() {
    let route = useRouter();
    const ipcRenderer = useIpcRenderer();

    onMounted(() => {
      systemEventBus.$on('showDialog', (res) => {
        if (res === "日志记载") {
          console.log('///////////////////////////');
          ipcRenderer.send('openDialog', "日志记载")
        }
      })
    })
    return {
      route
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
}

* {
  margin: 0; // 如果不设置清除样式无法填满背景
}

.body {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>