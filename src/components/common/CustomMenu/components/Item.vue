<!-- 
* @description: 菜单中的每一项具体内容 处理点击事件
* @fileName: Item.vue
* @author:刘世博 文洋
* @date: 2024-01-11
* @version: 
!-->
<template>
  <li @click="chooseItem">
    <slot></slot>
  </li>
</template>

<script>
import { getCurrentInstance, inject } from 'vue'
import systemEventBus from '@/utils/systemEventBus'

export default {
  props: {
    value: String,
    type:Number,
  },
  setup(props) {
    const chooseItem = () => {
      systemEventBus.$emit('chooseItem', props.value, props.type, token)
    }

    // 获取实例
    const page = getCurrentInstance();
    // 接收token
    const token = inject('token');
    // 缓存token
    page.token = token

    return {
      chooseItem
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  padding: 4px 20px;
}

li:hover {
  background-color: rgb(185,190,194);
  transition: all .2s;
}
</style>