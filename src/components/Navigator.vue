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
      <!-- 显示所有打开过的标签页 -->
      <div v-for="route in routes" :key="route.name" @click="switchTab(route)" class="tab">
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
import { onMounted, ref, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import systemEventBus from '@/utils/systemEventBus';
import { useIpcRenderer } from "@vueuse/electron";

export default {
  name: 'Navigator',
  props: {
    routes: Array, // 路由数组
    currentRoute: Object,  // 当前路由
  },
  setup(props) {
    console.log('routes=======================>', props.routes);
    console.log('current======================>', props.currentRoute);

    let monitoring = ref(false)
    const ipcRenderer = useIpcRenderer();
    const router = useRouter();
    const Store = require('electron-store');
    const Estore = new Store();

    const logout = () => {
      // 清空logindata和token
      Estore.set('logindata', {
        username: null,
        password: null,
      })
      Estore.set('token', null)
      Estore.set('recordPassword', false)
      ipcRenderer.send("login-deny")
    }

    onBeforeMount(() => {
      if (monitoring.value === false) {
        // 初始时只添加 "页面总览" 的路由标签页
        props.routes.push({ name: '页面总览' });
        router.push("/overview");
      }
    })

    onMounted(() => {
      systemEventBus.$on('showFunc', (res) => {
        console.log('打开内机监控');
        if (res === "内机监控") {
          monitoring.value = true
          // 切换路由时只添加不存在于 routes 数组的标签页
          if (!props.routes.some((route) => route.name === '内机监控')) {
            props.routes.push({ name: '内机监控' });
          }
          router.push("/monitoring");
        }
      })
    })

    return {
      logout,
      monitoring
    }
  },
  methods: {
    switchTab(route) {
      // 只有当标签页不存在于 routes 数组中时，再添加到数组
      if (!this.routes.some((r) => r.name === route.name)) {
        this.routes.push({ name: route.name });
      }
      this.$router.push({ name: route.name });
    },
    closeTab(route) {
      // 移出数组前判断是否是当前路由
      if (this.currentRoute.name === route.name) {
        this.$router.push({ name: '页面总览' }); // 导航至默认路由 （总览）
      }

      // 移除相应的标签页
      const index = this.routes.findIndex((r) => r.name === route.name);
      if (index !== -1) {
        this.routes.splice(index, 1);
      }
    },
  },
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