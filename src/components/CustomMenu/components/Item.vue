<template>
  <li @click="chooseItem">
    <slot></slot>
  </li>
</template>

<script>
import { onMounted } from 'vue'
import eventBus from '../eventBus';
export default {
  props:{
    value:{
      type:String
    },
    type:{
      type: Number
    }
  },
  setup(props){
    const chooseItem = (res)=>{
      eventBus.$emit('chooseItem', props.value, props.type)
    }

    onMounted(()=>{

    })

    return {
      chooseItem
    }
  }
}
</script>

<style lang="scss" scoped>
li{
  list-style-type:none;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
li:hover{
  background-color: gray;
  transition: all .2s;
}
</style>