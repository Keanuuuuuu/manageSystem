<!-- 
* @description: 客制化菜单栏 系统/视图/工具/帮助 每一栏的填充内容
* @fileName: index.vue
* @author:刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->
<template>
  <div class="custom-menu-container">
    <Menu :menu="menu1">
      <template #selectDropDown>
        <Item :value="value1_1" :type="3">修改密码</Item>
        <Item :value="value1_2" :type="3">修改信息</Item>
        <Item :value="value1_3" :type="3">退出系统</Item>
        <Item :value="value1_4" :type="3">未读信息</Item>
      </template>
    </Menu>
    <Menu :menu="menu2">
      <template #selectDropDown>
        <Item :value="value2_1" :type="1">内机监控</Item>
        <Item :value="value2_2" :type="1">系统总览</Item>
      </template>
    </Menu>
    <Menu :menu="menu3">
      <template #selectDropDown>
        <Item :value="value3_1" :type="2">智能控制</Item>
        <Item :value="value3_2" :type="2">日志记载</Item>
        <Item :value="value3_3" :type="2">账号管理</Item>
        <Item :value="value3_4" :type="2">报警设置</Item>
      </template>
    </Menu>
    <Menu :menu="menu4">
      <template #selectDropDown>
        <Item :value="value4_1" :type="4">帮助</Item>
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
  props: {
    menuItems: {
      type: Array,
      default: () => [
        {
          label: "111",
          submenu: [
            {
              label: "112"
            }
          ]
        },
        {
          label: "111",
          submenu: []
        }
      ],
    },
  },
  data() {
    return {
      asClick: false,
      menu1: "系统",
      menu2: "视图",
      menu3: "工具",
      menu4: "帮助",
      value1_1: "修改密码",  
      value1_2: "修改信息",
      value1_3: "退出系统",
      value1_4: "未读信息",
      value2_1: "内机监控",
      value2_2: "系统总览",
      value3_1: "智能控制",
      value3_2: "日志记载",
      value3_3: "账号管理",
      value3_4: "报警设置",
      value4_1: "帮助"
    }
  },
  methods: {
    handleItemClick(item) {
      this.asClick = true
      if (item.click) {
        item.click();
      }
    },
    handleSubItemClick(item) {
      if (item.click) {
        item.click();
      }
    },
    blur() {
      this.asClick = false
    }
  },
};
</script>

<style lang="scss" scoped>
.custom-menu-container {
  position: relative;
  -webkit-app-region: no-drag;
  width: 100%;
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
  margin-left: 10px;
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
}</style>
