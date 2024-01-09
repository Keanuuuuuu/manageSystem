<!-- 
* @description: 删除节点对话弹窗
* @fileName: index.vue
* @author: 刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->

<template>
  <el-form ref="ruleFormRoomRef" :model="ruleFormRoom" :rules="rules" label-width="100px" class="demo-ruleForm"
    :size="formSize" status-icon>
    <el-scrollbar height="500px">
      <span>删除节点</span>
      <el-form-item label="节点属性:" prop="nodeProperties">
        <el-radio-group v-model="ruleFormRoom.nodeProperties">
          <el-radio label="标签" />
          <el-radio label="房间" />
          <el-radio label="设备" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内机的ID:" prop="_machineId" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
        <el-input v-model="ruleFormRoom._machineId" disabled />
      </el-form-item>
      <el-form-item label="所属房间ID:" prop="roomName" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
        <el-input v-model="ruleFormRoom.roomName" disabled />
      </el-form-item>

      <el-form-item label="楼栋名称:" prop="BuildingName" v-show="ruleFormRoom.nodeProperties === '房间'" label-width="120px">
        <el-input v-model="ruleFormRoom.BuildingName" disabled />
      </el-form-item>
      <el-form-item label="房间名称:" prop="roomName" v-show="ruleFormRoom.nodeProperties === '房间'" label-width="120px">
        <el-input v-model="ruleFormRoom.roomName" disabled />
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
  BuildingName: '',
  _machineId: '',
})

onMounted(() => {
  // 这里要根据用户右键的位置来判断此次是添加房间还是设备
  ruleFormRoom.nodeProperties = props.deleteType.value;
  ruleFormRoom._machineId = props.deleteType._machineId;
  ruleFormRoom.roomName = props.deleteType.roomName;
  ruleFormRoom.BuildingName = props.deleteType.__buildingId;
})

const rules = reactive({
  roomName: [
    { required: true, message: '此项为必填项', trigger: 'blur' }
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  BuildingName: [
    { required: true, message: '此项为必填项', trigger: 'blur' }
  ],
  _machineId: [
    { required: true, message: '此项为必填项', trigger: 'blur' },
  ],
  _machineName: [
    { required: true, message: '此项为必填项', trigger: 'blur' },
  ],
  _gatewayId: [
    { required: true, message: '此项为必填项', trigger: 'blur' },
  ],
  _deviceId: [
    { required: true, message: '此项为必填项', trigger: 'blur' },
  ],
  _deviceOrder: [
    { required: true, message: '此项为必填项', trigger: 'blur' },
  ],
  _machineOrder: [
    { required: true, message: '此项为必填项', trigger: 'blur' },
  ],
})

watchEffect(() => {
  ruleFormRoom.nodeProperties = props.deleteType.value
  if (ruleFormRoom.nodeProperties === "房间") {
    ruleFormRoom.BuildingName = props.deleteType.__buildingId;
    ruleFormRoom.roomName = props.deleteType.roomName;
    rules._machineId[0].required = false
    rules.roomName[0].required = true
    rules.BuildingName[0].required = true
  }

  if (ruleFormRoom.nodeProperties === "设备") {
    ruleFormRoom._machineId = props.deleteType._machineId;
    ruleFormRoom.roomName = props.deleteType.__buildingId;
    rules._machineId[0].required = true
    rules.roomName[0].required = true
    rules.BuildingName[0].required = false
  }
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('deleteDialogSubmit!', ruleFormRoom)
      emits('deleteDialogSubmit', ruleFormRoom)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  console.log(formEl);
  // 逻辑待完善，清除的时候，会把不能输入的项也清空了
  // formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin: 0 auto;
  width: 350px;
}
</style>