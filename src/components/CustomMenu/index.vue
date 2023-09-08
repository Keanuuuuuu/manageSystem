<template>
  <div class="custom-menu-container">
    <!-- <div class="custom-menu">
      <div class="menu-item" v-for="item in menuItems" :key="item.label" @click="handleItemClick(item)">
        {{ item.label }}
        <div v-if="asClick && item.submenu" class="submenu">
          <div
            class="submenu-item"
            v-for="subItem in item.submenu"
            :key="subItem.label"
            @click="handleSubItemClick(subItem)"
          >
            {{ subItem.label }}
          </div>
        </div>
      </div>
    </div> -->
    <Menu :menu="menu1">
      <template #selectDropDown>
        <Item :value="value1" :type="3">设置</Item>
      </template>
    </Menu>
    <Menu :menu="menu2">
      <template #selectDropDown>
        <Item :value="value2" :type="1">内机监控</Item>
      </template>
    </Menu>
    <Menu :menu="menu3">
      <template #selectDropDown>
        <Item :value="value4" :type="2">日志记载</Item>
        <Item :value="value5" :type="2">账号管理</Item>
      </template>
    </Menu>
    <Menu :menu="menu4">
      <template #selectDropDown>
        <Item :value="value3" :type="4">帮助</Item>
      </template>
    </Menu>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Item from './components/Item.vue'
export default {
  components:{
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
  data(){
    return{
      asClick: false,
      menu1: "系统",
      menu2: "视图",
      menu3: "功能",
      menu4: "帮助",
      value1: "设置",
      value2: "内机监控",
      value3: "帮助",
      value4: "日志记载",
      value5: "账号管理"
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
    blur(){
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
.menu-item:hover{
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
