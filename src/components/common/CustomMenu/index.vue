<!-- 
* @description: 客制化菜单栏 系统/视图/工具/帮助 完成菜单的组装
* @fileName: index.vue
* @author:刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->
<template>
  <div class="custom-menu-container">
    <Menu :menu="menu1">
      <template #selectDropDown>
        <Item :value="value1_1" :type="changePSW">{{value1_1}}</Item>
        <Item :value="value1_2" :type="changeInfoDialog">{{value1_2}}</Item>
        <Item :value="value1_3" :type="quitSystem">{{value1_3}}</Item>
      </template>
    </Menu>
    <Menu :menu="menu2">
      <template #selectDropDown>
        <Item :value="value2_1" :type="routes">{{value2_1}}</Item>
        <Item :value="value2_2" :type="routes">{{value2_2}}</Item>
      </template>
    </Menu>
    <Menu :menu="menu3">
      <template #selectDropDown>
        <Item :value="value3_2" :type="dialog">{{value3_2}}</Item>
        <Item :value="value3_3" :type="routes">{{value3_3}}</Item>
      </template>
    </Menu>
    <Menu :menu="menu4">
      <template #selectDropDown>
        <Item :value="value4_1" :type="link">{{value4_1}}</Item>
      </template>
    </Menu>


    <div id="switch">
      <el-tooltip effect="dark" content="切换账号" placement="left-end">
        <el-icon id="power" @click="logout">
          <User /> <Switch id="foo"/>
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import Menu from './components/Menu.vue'
import Item from './components/Item.vue'
import { useIpcRenderer } from '@vueuse/electron';

const Store = require('electron-store'); 
const Estore = new Store();
const ipcRenderer = useIpcRenderer();

let routes="routes"
let dialog="dialog"
let changeInfoDialog="changeInfoDialog"
let changePSW="changePSW"
let quitSystem="quitSystem"
let link="link"

let menu1= "系统"
let menu2= "视图"
let menu3= "工具"
let menu4= "帮助"
let value1_1= "修改密码"
let value1_2= "修改信息"
let value1_3= "退出系统"
let value2_1= "总览"
let value2_2= "内机监控"
let value3_2= "日志记载"
let value3_3= "账号管理"
let value4_1= "帮助"

function logout() {
  Estore.set('logindata', {
    username: null,
    password: null,
  });
  Estore.set('token', null);
  Estore.set('recordPassword', false);
  ipcRenderer.send('login-deny');
}
</script>

<style lang="scss" scoped>
.custom-menu-container {
  position: relative;
  -webkit-app-region: no-drag;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 3px;
  width: 100%;
}

.custom-menu {
  background-color: #333;
  color: white;
  display: flex;
  padding: 10px;
  flex-direction: row;
}

.menu-item {
  margin-left: 0px;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
}

.menu-item:hover {
  background-color: white;
}

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: #444;
  border: 1px solid #222;
  z-index: 1000;
}

.submenu-item {
  padding: 5px 10px;
  cursor: pointer;
  color: white;
}

.submenu-item:hover {
  background-color: white;
}

#switch {
  position: absolute;
  right: 0;

  #power {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 3px;
    right: 20px;
    font-size: 17px;
    width: 40px;
    height: 25px;

    &:hover {
      color: red;
    }
  }
  #foo{
    position: absolute;
    width: 14px;
    left: 15px;
    top: 3px;
  }
}
</style>
