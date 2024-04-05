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
      {{ findParentLabel(store.airconditionNodeData.label) + store.airconditionNodeData.label || "16栋教学楼"}}
    </div>
    <div class="member">
      共{{ store.airconditionNodeData.length }}台 正在运行{{ countOpenDevices }}台 
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useCustomStore } from '@/store';

const store = useCustomStore();

const findParentLabel = (label) => {
  const findParent = (node, parentLabel = '') => {
    if (!node) {
      return null; // 没有找到匹配的标签
    }

    if (node.label === label) {
      return parentLabel; // 找到匹配的标签，返回父级标签
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const result = findParent(child, parentLabel ? `${parentLabel}${node.label}-` : node.label+'-');
        if (result !== null) {
          return result;
        }
      }
    }

    return null; // 没有找到匹配的标签
  };

  for (const node of store.leftTreeData) {
    const parentLabel = findParent(node);
    if (parentLabel !== null) {
      return parentLabel;
    }
  }

  return null; // 没有找到匹配的标签
}


const countOpenDevices = computed(() => {
  let count = 0
  for (const device of store.monitorTableData) {
    if (device.status === '开') {
      count++
    }
  }
  return count
})
</script>

<style lang="scss" scoped>
.Monitor_display_head {
  background-color: rgba($color: #467AFF, $alpha: 0.1);
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
}
</style>