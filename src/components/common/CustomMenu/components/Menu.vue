<!-- 
* @description: 定制化菜单 系统/视图/工具/帮助    判断并发送路由或弹窗类型
* @fileName: Menu.vue
* @author: 刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->
<template>
  <div class="menu-container">

    <div ref="menu_button" class="menu-button" @click="handleClick">
      <!-- 选中内容 -->
      <span>{{ menu }}</span>
    </div>

    <!-- 下拉内容 -->
    <teleport to="body">
      <transition name="menu">
        <div ref="menu_dropdown" v-show="selectOpen" :style="dropdownStyle" class="menu-dropdown">
          <ul>
            <slot name="selectDropDown"></slot>
          </ul>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { ref, onDeactivated, onMounted, watch, computed, provide, getCurrentInstance } from 'vue'
import systemEventBus from '@/utils/systemEventBus'
import { tokenFun } from '@/utils/token'
// 此处的token充当了一个唯一标识符的角色，用于识别特定的组件实例，并确保其与事件通信时的准确性和隔离性。

export default {
  props: ['menu'],
  setup() {
    // 获取菜单
    const menu_button = ref([]);
    // 获取下拉框
    const menu_dropdown = ref(null);
    // 标识下拉框是否打开
    const selectOpen = ref(false)
    // 获取从Item选中的数据
    const selectValue = ref(null)
    // 获取实例，配置唯一标识，并注入给后代
    const page = getCurrentInstance()
    var token = 'select-' + tokenFun()
    page.token = token
    provide('token', token)
    // 下拉框位置
    const dropdownPosition = ref({ x: 0, y: 0, w: 0 })

    // 下拉框位置
    const dropdownStyle = computed(() => {
      return {
        left: `${dropdownPosition.value.x}px`,
        top: `${dropdownPosition.value.y}px`,
        // width: `${dropdownPosition.value.w}px`
      }
    })

    const calculatePosition = () => {
      const menu_button_dom = menu_button.value.getBoundingClientRect()
      dropdownPosition.value.x = menu_button_dom.left - 10
      dropdownPosition.value.y = menu_button_dom.top + menu_button_dom.height + 2
      // dropdownPosition.value.w = menu_button_dom.width
    }

    const handleClick = () => {
      selectOpen.value = !selectOpen.value
    }

    // 点击非按钮或下拉框区域也会收起下拉框
    window.addEventListener('click', (event) => {
      if (!menu_button.value.contains(event.target) && !menu_dropdown.value.contains(event.target)) {
        selectOpen.value = false
      }
    })

    window.addEventListener('resize', () => {
      // 重新计算面板位置
      calculatePosition();
    })

    window.addEventListener('scroll', () => {
      calculatePosition();
    })

    watch(selectOpen, () => {
      calculatePosition()
    })

    // 当组件卸载时释放这些监听
    onDeactivated(() => {
      window.removeEventListener('click')
      window.removeEventListener('resize')
      window.removeEventListener('scroll')
    })

    onMounted(() => {
      calculatePosition()
      //判断并发送路由或弹窗类型
      systemEventBus.$on('chooseItem', (res, type, token) => {
        if (token === page.token) {
          selectValue.value = res
          // console.log(type);
          if (type === "routes") {
            // console.log('路由类型',res);
            systemEventBus.$emit('GoRoutes', res) //res为对应的route.name Navigator组件可根据name进行跳转
          }
          if (type === "dialog") {
            console.log('弹窗类型');
            systemEventBus.$emit('openDialog', res)
          }
          if(type === "changeInfoDialog"){
            console.log(111);
            systemEventBus.$emit('openChangeInfoDialog', res)
          }
          if (type === "changePSW"){
            systemEventBus.$emit('openChangePSW', res)
          }
          selectOpen.value = false
        }
      })
    })

    return {
      menu_button,
      menu_dropdown,
      selectOpen,
      selectValue,
      dropdownStyle,
      handleClick,
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  width: 70px;
  margin: 3px 0px 0px 5px;
  padding: 0 10px;
  color: #23262F;
  cursor: pointer;
  border: #E6E8EC 2px solid;
  box-sizing: border-box;
  transition: border .2s;
  margin-left: 10px;

  .menu-button {
    height: 20px;
    text-align: center;
    span {
      user-select: none;
    }
  }
}

.menu-container:hover {
  border: #23262F 2px solid;
}

.menu-dropdown {
  position: fixed;
  background-color: white;
  cursor: pointer;

  ul {
    list-style: none;
    overflow: hidden;
    border: #E6E8EC 2px solid;
    box-sizing: border-box;
    box-shadow: 0 4px 12px rgba(35, 38, 47, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.select-enter-from,
.select-leave-to {
  // opacity: 0;
  transform: scale(0.9);
}

.select-enter-active,
.select-leave-active {
  transform-origin: top center;
  transition: opacity .4s cubic-bezier(0.5, 0, 0, 1.25), transform .2s cubic-bezier(0.5, 0, 0, 1.25);
}
</style>