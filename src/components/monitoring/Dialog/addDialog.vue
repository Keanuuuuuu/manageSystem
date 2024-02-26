<!-- 
* @description: 新增节点对话弹窗
* @fileName: addDialog.vue
* @author: 刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->
<template>
  <el-form
    ref="ruleFormRoomRef"
    :model="ruleFormRoom"
    :rules="rules"
    label-width="150px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
  <el-scrollbar height="500px">
    <span>编辑节点</span>
    <el-form-item label="节点属性:" prop="nodeProperties">
      <el-radio-group v-model="ruleFormRoom.nodeProperties">
        <el-radio label="标签" />
        <el-radio label="房间" />
        <el-radio label="设备" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="设备ID:" prop="_machineId" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom._machineId" placeholder="x_x_x"/>
    </el-form-item>
    <el-form-item label="设备名称:" prop="_machineName" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom._machineName" placeholder="第x台空调"/>
    </el-form-item>
    <el-form-item label="所属网关:" prop="_gatewayId" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom._gatewayId" placeholder="x"/>
    </el-form-item>
    <el-form-item label="所属设备ID:" prop="_deviceId" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom._deviceId" placeholder="xx"/>
    </el-form-item>
    <el-form-item label="所属设备地址:" prop="_deviceOrder" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom._deviceOrder" placeholder="x"/>
    </el-form-item>
    <el-form-item label="所属内机地址:" prop="_machineOrder" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom._machineOrder" placeholder="x"/>
    </el-form-item>
    <el-form-item label="所属房间ID:" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom.__roomId" disabled/>
    </el-form-item>
    <el-form-item label="所属楼栋ID:" v-show="ruleFormRoom.nodeProperties === '设备'" label-width="120px">
      <el-input v-model="ruleFormRoom.__buildingId" disabled/>
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
    <el-form-item label="负责人邮箱:" prop="gatewayIp" label-width="120px">
      <el-input v-model="ruleFormRoom.headEmail" />
    </el-form-item>
    <el-form-item label="备注:" prop="gatewayIp" label-width="120px">
      <el-input v-model="ruleFormRoom.notes" />
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
const emits = defineEmits(['addDialogSubmit'])
const props = defineProps({
  addType: Object
})

const formSize = ref('default')
const ruleFormRoomRef = ref()
const ruleFormRoom = reactive({
  _machineId:"", //内机id（必填，让用户填写）
  _machineName:"", //内机名称/label（必填，让用户填写）
  _gatewayId:"", //所属网关id（必填，让用户填写）
  _deviceId:"", //所属设备id（必填，让用户填写）
  _deviceOrder: null, //所属设备地址（必填，让用户填写）
  _machineOrder: null, //内机地址（必填，让用户填写）
  __roomId:"", //所属房间id（必填，前端自带，不让用户填）
  __buildingId:"", //所属楼栋id（必填，前端自带，不让用户填）
  privateGatewayIp:"", //私有网关ip（非必填，让用户填写）
  belongToGroup:"", //所属机组（非必填，让用户填写）
  headName:"", //负责人名称（非必填，让用户填写）
  headPhone:"", //负责人电话（非必填，让用户填写）
  headEmail:"", //负责人邮箱（非必填，让用户填写）
  notes:"", //备注（非必填，让用户填写）

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
      console.log('addDialogSubmit!',ruleFormRoom)
      emits('addDialogSubmit',ruleFormRoom)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  // formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.demo-ruleForm{
  margin: 0 auto;
  width: 400px;
}
</style>