<template>
  <el-form
    ref="ruleFormRoomRef"
    :model="ruleFormRoom"
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
  <el-scrollbar height="500px">
    <span>删除节点</span>
    <el-form-item label="节点属性:" prop="nodeProperties">
      <el-radio-group v-model="ruleFormRoom.nodeProperties">
        <el-radio label="标签" />
        <el-radio label="房间" />
        <el-radio label="设备" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="私有网关IP:" prop="gatewayIp" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom.privateGatewayIp" />
    </el-form-item>
    <el-form-item label="所属机组:" prop="gatewayIp" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom.belongToGroup" />
    </el-form-item>

    <el-form-item label="楼栋名称:" prop="BuildingName" v-show="ruleFormRoom.nodeProperties === '房间'" label-width="120px">
      <el-input v-model="ruleFormRoom.BuildingName" />
    </el-form-item>
    <el-form-item label="房间名称:" prop="roomName" v-show="ruleFormRoom.nodeProperties === '房间'" label-width="120px">
      <el-input v-model="ruleFormRoom.roomName" />
    </el-form-item>

    <el-form-item label="负责人名称:" prop="gatewayIp" label-width="120px">
      <el-input v-model="ruleFormRoom.headName" />
    </el-form-item>
    <el-form-item label="负责人电话:" prop="gatewayIp" label-width="120px">
      <el-input v-model="ruleFormRoom.headPhone" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRoomRef)">
        确定
      </el-button>
      <el-button @click="resetForm(ruleFormRoomRef)">取消</el-button>
    </el-form-item>
  </el-scrollbar>
  </el-form>
</template>

<script setup>
import { reactive, ref, defineEmits, defineProps, toRef, onMounted, watchEffect } from 'vue'
const emits = defineEmits(['deleteDialogSubmit'])
const props = defineProps({
  deleteType: Object
})

const formSize = ref('default')
const ruleFormRoomRef = ref()
const ruleFormRoom = reactive({
  nodeProperties: '',
  roomName: '',
  BuildingName: ''
})

onMounted(()=>{
  // 这里要根据用户右键的位置来判断此次是添加房间还是设备
  ruleFormRoom.nodeProperties = props.addType.value
  ruleFormRoom.__buildingId = props.addType.__buildingId
  ruleFormRoom.__roomId = props.addType.__roomId
})

const rules = reactive({
  roomName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  BuildingName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ],
  _machineId: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  _machineName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  _gatewayId: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  _deviceId: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  _deviceOrder: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  _machineOrder: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
})

watchEffect(()=>{
  ruleFormRoom.nodeProperties = props.addType.value
  if(ruleFormRoom.nodeProperties === "房间"){
    rules._machineId[0].required = false
    rules._machineName[0].required = false
    rules._gatewayId[0].required = false
    rules._deviceId[0].required = false
    rules._deviceOrder[0].required = false
    rules._machineOrder[0].required = false
    rules.roomName[0].required = true
    rules.BuildingName[0].required = true
  }
  
  if(ruleFormRoom.nodeProperties === "设备"){
    ruleFormRoom.__buildingId = props.addType.__buildingId
    ruleFormRoom.__roomId = props.addType.__roomId
    rules._machineId[0].required = true
    rules._machineName[0].required = true
    rules._gatewayId[0].required = true
    rules._deviceId[0].required = true
    rules._deviceOrder[0].required = true
    rules._machineOrder[0].required = true
    rules.roomName[0].required = false
    rules.BuildingName[0].required = false
  }
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('deleteDialogSubmit!',ruleFormRoom)
      emits('deleteDialogSubmit',ruleFormRoom)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.demo-ruleForm{
  margin: 0 auto;
  width: 350px;
}
</style>