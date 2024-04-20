<!-- 
* @description: 修改节点对话弹窗
* @fileName: changeDialog.vue
* @author: 刘世博
* @date: 2024-04-20
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
  <el-scrollbar height="300px">
    <el-form-item label="所属楼栋ID:" label-width="140px">
      <el-input v-model="ruleFormRoom.__buildingId" disabled/>
    </el-form-item>
    <el-form-item label="所属房间ID:" label-width="140px">
      <el-input v-model="ruleFormRoom.__oldId" disabled/>
    </el-form-item>
    <el-form-item label="修改后的房间ID:" prop="newId" label-width="140px">
      <el-input v-model="ruleFormRoom.newId" disabled/>
    </el-form-item>
    <el-form-item label="修改后的房间名:" prop="label" label-width="140px">
      <el-input v-model="ruleFormRoom.label" />
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
  changeType: Object
})

const formSize = ref('default')
const ruleFormRoomRef = ref()
const ruleFormRoom = reactive({
  __oldId:"",
  __buildingId:"",
  newId:"",
  label:""
})

onMounted(()=>{
  ruleFormRoom.__buildingId = props.changeType.__buildingId
  ruleFormRoom.__oldId = props.changeType.__oldId
  ruleFormRoom.newId = props.changeType.newId
})

const rules = reactive({
  label: [
    { required: true, message: '此项为必填项', trigger: 'blur' },
  ],
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('changeDialogSubmit!',ruleFormRoom)
      emits('changeDialogSubmit',ruleFormRoom)
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