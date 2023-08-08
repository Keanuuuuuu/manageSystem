<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <span>编辑节点</span>
    <el-form-item label="节点属性:" prop="nodeProperties">
      <el-radio-group v-model="ruleForm.nodeProperties">
        <el-radio label="标签" />
        <el-radio label="房间" />
        <el-radio label="设备" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="房间名称:" prop="roomName">
      <el-input v-model="ruleForm.roomName" />
    </el-form-item>
    <el-form-item label="设备名称:" prop="deviceName">
      <el-input v-model="ruleForm.deviceName" />
    </el-form-item>
    <el-form-item label="所属机组:">
      <el-input v-model="ruleForm.unit" />
    </el-form-item>
    <el-form-item label="所属网关:">
      <el-input v-model="ruleForm.gateway" />
    </el-form-item>
    <el-form-item label="网关IP:" prop="gatewayIp">
      <el-input v-model="ruleForm.gatewayIp" />
    </el-form-item>
    <el-form-item label="设备地址:" prop="deviceAddress">
      <el-select-v2
        v-model="ruleForm.deviceAddress"
        placeholder="设备地址"
        :options="options"
      />
    </el-form-item>
    <el-form-item label="负责人:">
      <el-input v-model="ruleForm.head" />
    </el-form-item>
    <el-form-item label="联系方式:">
      <el-input v-model="ruleForm.contact" />
    </el-form-item>
    <el-form-item label="备注:">
      <el-input v-model="ruleForm.remark" type="textarea" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, defineEmits } from 'vue'
import {  } from 'vue-demi'
const emits = defineEmits(['addDialogSubmit'])

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
  nodeProperties: '',
  roomName: '',
  deviceName: '',
  unit: '',
  gateway: '',
  gatewayIp: '',
  deviceAddress: '',
  head: '',
  contact: '',
  remark: ''
})

const rules = reactive({
  nodeProperties:[

  ],
  roomName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  deviceName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  unit: [

  ],
  gateway: [

  ],
  gatewayIp: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  deviceAddress: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  head: [

  ],
  contact: [

  ],
  remark: [
    { required: false, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!',valid)
      emits('addDialogSubmit',valid)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 16 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<style lang="scss" scoped>
.demo-ruleForm{
  margin: 0 auto;
  width: 350px;
}
</style>