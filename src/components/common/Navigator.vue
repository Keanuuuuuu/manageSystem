<!-- 
* @description: 路由显示一栏/右侧切换账号
* @fileName: arti.vue
* @author:刘世博 文洋
* @date: 2024-01-10
* @version: 
!-->
<template>
  <div class="bar">
    <div class="tab-bar">
      <div v-for="route in navigatorRoutes" :key="route" @click="switchTab(route)"
        :class="{ 'tab': true, 'active': currentRoute === route }">
        {{ route }}
        <span @click.stop="closeTab(route)">✖</span>
      </div>
    </div>

    <div id="switch">
      <el-tooltip effect="dark" content="切换账号" placement="left-end">
        <el-icon id="power" @click="logout">
          <Switch />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCustomStore } from '@/store';
import systemEventBus from '@/utils/systemEventBus';
import { useIpcRenderer } from '@vueuse/electron';

const ipcRenderer = useIpcRenderer();
const router = useRouter();
const store = useCustomStore(); //小写的是pinia的store
const Store = require('electron-store'); 
const Estore = new Store();

const navigatorRoutes = store.navigatorRoutes;
const currentRoute = ref(router.currentRoute.value.name);

onMounted(() => {
  systemEventBus.$on('openDialog', (res) => {
    console.log(res);
    ipcRenderer.send('openDialog');
  });

  systemEventBus.$on('openChangeInfoDialog', (res) => {
    console.log(res);
    ipcRenderer.send('openChangeInfoDialog');
  });

  systemEventBus.$on('openChangePSW', (res) => {
    console.log(res);
    ipcRenderer.send('openChangePSW');
  });


  systemEventBus.$on('GoRoutes', (route) => {
    store.addNavigatorRoutes(route);
    router.push({ name: route });
  });

  router.beforeEach((to, from, next) => {
    currentRoute.value = to.name;
    next();
  });
});

function logout() {
  Estore.set('logindata', {
    username: null,
    password: null,
  });
  Estore.set('token', null);
  Estore.set('recordPassword', false);
  ipcRenderer.send('login-deny');
}

function switchTab(route) {
  router.push({ name: route });
}

function closeTab(route) {
  store.deleteNavigatorRoutes(route);
  router.push({ name: '页面总览' });
}
</script>


<style lang="scss" scoped>
.bar {
  display: flex;
  box-sizing: border-box;
  height: 60px;
  border-top: 2px solid rgb(217, 219, 223);
  border-bottom: 2px solid rgb(217, 219, 223);

  .tab-bar {
    margin-left: 5px;
    display: flex;
    padding: 8px;
    height: 40px;

    .tab {
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 4px;
      cursor: pointer;
      border: 2px solid #ccc;
      background-color:  whitesmoke;

      &:hover {
        background-color:rgb(231,238,243);
        border: 2px solid $color-theme;
      }

      &.active {
        background-color: rgb(231, 238, 243);
        border: 2px solid $color-theme;
      }

      span {
        margin-left: 8px;
        cursor: pointer;
      }

      span:hover {
        color: red;
      }
    }
  }
}

#switch {
  position: absolute;
  right: 0;

  #power {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 20px;
    width: 40px;
    height: 30px;

    &:hover {
      color: red;
    }
  }
}
</style>