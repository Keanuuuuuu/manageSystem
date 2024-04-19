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
  background-color: rgb(245, 245, 245);

  .tab-bar {
    margin-left: 5px;
    display: flex;
    padding: 8px;
    height: 40px;

    .tab {
      padding: 7px 8px;
      margin-right: 8px;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid #ccc;
      background-color:  white;

      &:hover {
        background-color:rgb(246,248,254);
        border: 2px solid $color-theme;
      }

      &.active {
        // background-color: rgb(231, 238, 243);
        border: 2px solid $color-theme;
      }

      span {
        margin-left: 4px;
        cursor: pointer;
      }

      span:hover {
        color: red;
      }
    }
  }
}

</style>