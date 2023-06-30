<template>
  <div class="Monitor_display_control">
      <el-button class="btn">状态刷新</el-button>
      <el-button class="btn" @click="changeDialogVisible">实时控制</el-button>
      <el-button class="btn">智能控制</el-button>
      <el-button class="btn">数据统计</el-button>
      <el-input
        v-model="input"
        placeholder="Please input"
        class="input-with-select"
        >
        <template #prepend>
          <el-button :icon="Search" />
        </template>
      </el-input>
  </div>
</template>
  
<script>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
export default {
  name: 'Monitor_display_control',
  props: {
    dialogVisible: {
      type: Boolean
    },
    control_dialogValue: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const input = ref('')
    const select = ref('')
    const DialogVisible = ref(props.dialogVisible)
    const Control_dialogValue = ref(props.control_dialogValue)

    function changeDialogVisible() {
      DialogVisible.value = true
      Control_dialogValue.value = true
      emit('updateDialogVisible', DialogVisible.value)
      emit('updateControl_dialogValue', Control_dialogValue.value)
    }

    return {
      input,
      select,
      DialogVisible,
      Search,
      changeDialogVisible
    }
  }
}
</script>
  
<style lang="scss" scoped>
.Monitor_display_control{
  height: 10%;
  display: flex;
  flex-direction: row;
  .input-with-select{
    height: 50%;
    width: 20%;
    margin: auto 10px;
  }
  .btn{
    height: 50%;
    margin: auto 10px;
  }
}
</style>