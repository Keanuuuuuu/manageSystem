<template>
  <li @click="chooseItem">
    <slot></slot>
  </li>
</template>

<script>
import { onMounted, getCurrentInstance, inject } from 'vue'
import systemEventBus from '@/utils/systemEventBus'

export default {
  props: {
    value: {
      type: String
    },
    type: {
      type: Number
    }
  },
  setup(props) {
    const chooseItem = (res) => {
      systemEventBus.$emit('chooseItem', props.value, props.type, token)
    }

    // 获取实例
    const page = getCurrentInstance();
    // 接收token
    const token = inject('token');
    // 缓存token
    page.token = token

    onMounted(() => {

    })

    return {
      chooseItem
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

li:hover {
  background-color: gray;
  transition: all .2s;
}
</style>