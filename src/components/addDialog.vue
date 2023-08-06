<template>
  <div class="contentDialog">
    <div class="control Label_control">
      <span>*节点属性</span>
      <el-checkbox-group v-model="checkedCities" :min="3" :max="1">
        <el-checkbox>标签</el-checkbox>
        <el-checkbox>房间</el-checkbox>
        <el-checkbox>设备</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="control Room_control">
      <span>*房间名称</span>
      <el-input v-model="input" placeholder="Please input" />
    </div>
    <div class="control Equipment_control">
      <span>*设备名称</span>
      <el-input v-model="input" placeholder="Please input" />
    </div>
    <div class="control Unit_control">
      <span>所属机组</span>
      <el-input v-model="input" placeholder="Please input" />
    </div>
    <div class="control Gateway_control">
      <span>所属网关</span>
      <el-input v-model="input" placeholder="Please input" />
    </div>
  </div>
</template>

<script>
export default{
  setup() {
      
  }
}
</script>

<style lang="scss" scoped>
.contentDialog{
  display: flex;
  flex-direction: column;
  width: 450px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .control{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 360px;
    margin: 15px auto;
  }
  span{
    width: 80px;
  }
  .Label_control{
    width: 300px;
  }
  .Room_control{
    width: 300px;
  }
  .Equipment_control{
    width: 300px;
  }
  .Unit_control{
    width: 300px;
  }
  .Gateway_control{
    width: 300px;
  }
}
</style>