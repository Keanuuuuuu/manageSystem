<template>
  <template v-if="$route.path == '/' || $route.path == '/dialog/login'">
    <LoginTitleBar></LoginTitleBar>
    <router-view />
  </template>

  <template v-else-if="$route.path == '/dialog/log'">
    <LogTitleBar></LogTitleBar>
    <router-view />
  </template>

  <template v-else-if="$route.path == '/dialog/findPWD'">
    <findPWDTitleBar></findPWDTitleBar>
    <router-view />
  </template>

  <template v-else>
    <div class="mainApp">
      <TitleBar></TitleBar>
      <CustomMenu></CustomMenu>
      <Navigator></Navigator>
      <router-view></router-view>
    </div>
  </template>
</template>

<script>
import { useRouter } from "vue-router";

import CustomMenu from "@/components/common/CustomMenu/index.vue"
import Navigator from "@/components/common/Navigator.vue";

import LoginTitleBar from '@/components/common/TitleBar/loginTitleBar.vue'
import TitleBar from "@/components/common/TitleBar/mainTitleBar.vue";
import LogTitleBar from '@/components/common/TitleBar/logTitleBar.vue';
import findPWDTitleBar from "@/components/common/TitleBar/PWDTitleBar.vue";


export default {
  name: "App",
  components: {
    Navigator,
    TitleBar,
    LoginTitleBar,
    LogTitleBar,
    findPWDTitleBar,
    CustomMenu
  },
  setup() {
    let route = useRouter();

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
}

.mainApp {
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