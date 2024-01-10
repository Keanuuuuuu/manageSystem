<!-- 
* @description: 路由显示一栏/右侧切换账号
* @fileName: arti.vue
* @author:刘世博 文洋
* @date: 2024-01-10
* @version: 
!-->
<template>
  <el-row class="top_navigation_bar">
    <el-col :span="24">
      <div class="bar">
        <router-link class="list-group-item overview" active-class="active" to="/overview">总览</router-link>
        <router-link class="list-group-item monitoring" active-class="active" to="/monitoring"
          v-if="monitoring">内机监控</router-link>
        
          <el-tooltip class="box-item" effect="dark" content="切换账号" placement="left-end">
          <el-icon id="power" @click="logout">
            <Switch />
          </el-icon>
        </el-tooltip>
      </div>
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>

import { onMounted, ref, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import systemEventBus from '@/utils/systemEventBus';
import { useIpcRenderer } from "@vueuse/electron";

export default {
  name: 'arti',
  setup() {
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
        router.push("/overview")
      }
    })

    onMounted(() => {
      systemEventBus.$on('showFunc', (res) => {
        if (res === "内机监控") {
          monitoring.value = true
        }
      })
    })

    return {
      logout,
      monitoring
    }
  }
}
</script>

<style lang="scss" scoped>
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

.top_navigation_bar {
  height: 92vh;
}

.body {
  .el-row {
    box-sizing: border-box;
    min-width: 1200px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .list-group-item {
    margin: 0 10px;
    height: 100%;
  }

  .bar {
    display: flex;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    height: 60px;
    div{
    margin: 0 5px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
    // 各个路由界面的高度百分比 + 顶部路由按键的高度百分比 = 100% 即整个arti组件的高度
  }
}

a {
  text-decoration: none;
  padding: 0 50px;
  display: block;
  display: flex;
  color: black;
  align-items: center;
  height: 45px;

  .icon {
    width: 24px;
  }
}

.router-link-exact-active {
  background-color: #E7EEF3;
}</style>