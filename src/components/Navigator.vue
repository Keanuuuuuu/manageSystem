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
      <!-- 只显示初始标签页 -->
      <div v-for="route in navigatorRoutes" :key="route.name" @click="switchTab(route)" class="tab">
        {{ route.name }}
        <span @click="closeTab(route)">✖</span>
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

<script>
import { onMounted, ref, onBeforeMount, computed } from 'vue';
import { useRouter } from "vue-router";
import systemEventBus from '@/utils/systemEventBus';
import { useIpcRenderer } from "@vueuse/electron";

export default {
  name: 'Navigator',
  props: {
    routes: Array, // 路由数组
  },
  setup(props) {
    const ipcRenderer = useIpcRenderer();
    const router = useRouter();
    const Store = require('electron-store');
    const Estore = new Store();
    const navigatorRoutes = ref(props.routes[1].children)

    onMounted(() => {
      console.log(props.routes[1].children);
      systemEventBus.$on('openDialog', (res) => {
        console.log(res);
        ipcRenderer.send('openDialog')
      })

      systemEventBus.$on('GoRoutes', (path) => {
        console.log(path);
        router.push(path)
      })
    })


    function logout() {
      // 清空logindata和token
      Estore.set('logindata', {
        username: null,
        password: null,
      })
      Estore.set('token', null)
      Estore.set('recordPassword', false)
      ipcRenderer.send("login-deny")
    }

    function switchTab(route) {
      // 切换到对应路由
      router.push({ name: route.name });
    }

    function closeTab(route) {
      const routesArray = navigatorRoutes.value;

      // 要删除的路径
      let pathToDelete = route.path

      // 查找要删除元素的索引
      let indexToDelete = routesArray.findIndex(route => route.path === pathToDelete);

      // 确保索引存在且不是第一位元素
      if (indexToDelete !== -1 && indexToDelete !== 0) {
        // 使用 splice 方法删除指定索引的元素
        routesArray.splice(indexToDelete, 1);
      }

      console.log(route);
    }


    return {
      navigatorRoutes,
      logout,
      switchTab,
      closeTab
    }
  }
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
    display: flex;
    padding: 8px;
    height: 40px;

    .tab {
      padding: 8px 12px;
      margin-right: 4px;
      border-radius: 4px;
      cursor: pointer;
      background-color: #ccc;

      .active {
        background-color: #ddd;
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