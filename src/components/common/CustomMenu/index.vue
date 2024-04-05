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
        <Item :value="value1_3" :type="dialog">{{value1_3}}</Item>
        <Item :value="value1_4" :type="dialog">{{value1_4}}</Item>
      </template>
    </Menu>
    <Menu :menu="menu2">
      <template #selectDropDown>
        <Item :value="value2_1" :type="routes">{{value2_1}}</Item>
        <Item :value="value2_2" :type="routes">{{value2_2}}</Item>
        <Item :value="value2_3" :type="routes">{{value2_3}}</Item>
      </template>
    </Menu>
    <Menu :menu="menu3">
      <template #selectDropDown>
        <Item :value="value3_1" :type="dialog">{{value3_1}}</Item>
        <Item :value="value3_2" :type="dialog">{{value3_2}}</Item>
        <Item :value="value3_3" :type="routes">{{value3_3}}</Item>
        <Item :value="value3_4" :type="dialog">{{value3_4}}</Item>
      </template>
    </Menu>
    <Menu :menu="menu4">
      <template #selectDropDown>
        <Item :value="value4_1" :type="dialog">{{value4_1}}</Item>
      </template>
    </Menu>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Item from './components/Item.vue'
export default {
  components: {
    Menu,
    Item
  },
  data() {
    return {
      routes:"routes",
      dialog:"dialog",
      changeInfoDialog:"changeInfoDialog",
      changePSW:"changePSW",
      menu1: "系统",
      menu2: "视图",
      menu3: "工具",
      menu4: "帮助",
      value1_1: "修改密码",  
      value1_2: "修改信息",
      value1_3: "退出系统",
      value1_4: "未读信息",
      value2_1: "内机监控",
      value2_2: "页面总览",
      value2_3: "数据统计",
      value3_1: "智能控制",
      value3_2: "日志记载",
      value3_3: "账号管理",
      value3_4: "报警设置",
      value4_1: "帮助",
    }
  },
};
</script>

<style lang="scss" scoped>
.custom-menu-container {
  position: relative;
  -webkit-app-region: no-drag;
  width: 100%;
  height: 28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;

  width: 100%;
    background-color: rgb(231,238,243);
    border-bottom:2px solid rgb(217, 219, 223);
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
</style>
