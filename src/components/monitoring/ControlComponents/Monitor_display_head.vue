<!-- 
* @description: 内机监控头部  【备注】：因为初始传来的数据格式不统一 所以有||"16栋教学楼"
* @fileName: Monitor_display_head.vue
* @author:刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->
<template>
  <div class="Monitor_display_head">
    <div class="title">
      目前展示：{{ store.airconditionNodeData.label || "16栋教学楼" }}
    </div>
    <div class="member">
      {{ store.airconditionNodeData.length }}台内机,其中
    </div>
  </div>
</template>

<script setup>
import { useCustomStore } from '@/store';
const store = useCustomStore();
</script>

<style lang="scss" scoped>
.Monitor_display_head {
  background-color: #E7EEF3;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .title {
    margin-left: 20px;
  }

  .member {
    position: absolute;
    right: 0;
    margin-right: 20px;
  }
}</style>