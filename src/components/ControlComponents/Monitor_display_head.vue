<!-- 
* @description: 内机监控头部
* @fileName: Monitor_display_head.vue
* @author:刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->
<template>
  <div class="Monitor_display_head">
    <div class="title">
      内机监控{{ titleChange }}
    </div>
    <div class="member">
      6台内机,其中
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
export default {
  name: 'Monitor_display_head',
  props:{
    titleChange:{
      type: String,
      default :'界面'
    }
  },
  setup(props) {

  }
}
</script>

<style lang="scss" scoped>
.Monitor_display_head{
  background-color: #E7EEF3;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .title{
    margin-left: 20px;
  }
  .member{
    margin-right: 20px;
  }
}
</style>