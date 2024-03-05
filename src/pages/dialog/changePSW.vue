<template>
  <div class="changePSW-contain">
    <el-form :model="dataForm" label-width="100px" :rules="dataFormRules" label-position="right">
      <el-form-item label="旧密码:" prop="oldpassword">
        <el-input v-model="dataForm.oldpassword" auto-complete="off" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newpassword" label-width="100px">
        <el-input v-model="dataForm.newpassword" type="password" clearable show-password style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkpassword" label-width="100px">
        <el-input v-model="dataForm.checkpassword" type="password" clearable show-password style="width: 200px"></el-input>
      </el-form-item>
    </el-form>
    <div class="changePSW-footer" style="margin-top: 5px;">
      <el-button  @click.native="handleUpdataPw">确认</el-button>
      <el-button @click.native="cgpwdVisible = false">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useIpcRenderer } from '@vueuse/electron';
import { post } from '@/api/http.js'

const Store = require('electron-store'); 
const Estore = new Store();
const ipcRenderer = useIpcRenderer();
const dataForm = ref({
  oldpassword: '',
  newpassword: '',
  checkpassword: ''
})

const dataFormRules = ref({
  oldpassword: [{
    required: true,
    message: '请输入原始密码'
  }],
  newpassword: [{
    required: true,
    message: '请输入新密码'
  }],
  checkpassword: [{
    required: true,
    message: '请确认新密码'
  }]
})

const checkPasswordSame = function(newVal, oldVal) {
  if(newVal && oldVal && newVal === oldVal){
    return true
  }else {
    return false
  }
}


const logWindowClose = function(){
  ipcRenderer.send("log-window-close"); // 向主进程通信
}

const logout = function() {
  console.log(1111);
  Estore.set('logindata', {
    username: null,
    password: null,
  });
  Estore.set('token', null);
  Estore.set('recordPassword', false);
  ipcRenderer.send('login-deny');
}

const handleUpdataPw = async function() {
  const checkpassword = dataForm.value.checkpassword
  const newpassword = dataForm.value.newpassword
  const oldpassword = dataForm.value.oldpassword
  const isSame = checkPasswordSame(newpassword, checkpassword)
  if(!isSame) {
    ElMessage({
      showClose: true,
      message: '密码不一致',
      type: "error",
    });
    return 
  }
  const res = await post('/password', {
    oldPassword: oldpassword,
    newPassword: newpassword
  })
  console.log(res);
  if(res.code === 21200){
    ElMessage({
      showClose: true,
      message: '修改成功',
      type: "success",
    });
    console.log(111);
    logWindowClose()
    logout()
  }else {
    ElMessage({
      showClose: true,
      message: `${res.msg}`,
      type: "error",
    });
  }
}
</script>

<style lang="scss" scoped>
.changePSW-contain{
  width: 90%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>