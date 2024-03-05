<!-- 
* @description: 登录页面 
* @fileName: login.vue
* @author: 文洋
* @date: 2024-01-10
* @version: 
!-->

<template>
  <div id="loginBox">
    <div id="logo">
      <img src="@/assets/airCondition.png" draggable="false" />
      <p>中央空调集中管理平台</p>
    </div>
    <div id="main">
      <div class="inputBox">
        <p>用户名</p>
        <el-input v-model="username" clearable />
      </div>
      <div class="inputBox">
        <p>密码</p>
        <el-input v-model="password" clearable type="password" show-password />
      </div>
      <div id="checkBox">
        <el-checkbox v-model="recordPassword" label="记住密码" size="large" />
        <el-link @click="PWD">忘记密码？</el-link>
      </div>
      <div id="loginBtn">
        <el-button color="#2f349a" id="loginBtn" @click="tryLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { post } from "@/api/http.js";
import { ElMessage } from "element-plus";
import { JSEncrypt } from "jsencrypt";
import { useIpcRenderer } from "@vueuse/electron";

const username = ref("");
const password = ref("");
let recordPassword = ref(false);
const electronStore = require('electron-store');
const Estore = new electronStore();
const ipcRenderer = useIpcRenderer();

// 加密函数
function encryptPWD(password) {
  const encryptor = new JSEncrypt()
  const key = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALiY4DWLKMiLRypsz4A8zdWyQF1fjZGof66PkXDt1AAwuEoKo8rNG9oP5iMZYr0TRDflCUebkP384qzDUFqcA3cCAwEAAQ=="
  encryptor.setPublicKey(key)
  return encryptor.encrypt(password + '')
}

// 尝试登录
function tryLogin() {
  const customUrl = "http://lab.zhongyaohui.club/login";
  const postData = {
    username: username.value.trim(),
    password: encryptPWD(password.value.trim()),
  };
  console.log(postData.password);
  if (postData.username === "" || postData.password === "") {
    ElMessage({
      showClose: true,
      message: "输入的内容不能为空！",
      type: "error",
      offset: 360
    });
  } else {
    post(customUrl, postData)
      .then(handleLoginResponse)
      .catch((error) => {
        console.error("登录失败:", error);
      });
  }
}

// 处理登录响应
function handleLoginResponse(res) {
  if (res.code === 21200) {
    const userData = res.data;
    console.log(userData);
    // 如果“记住密码”被选中，保存凭据到本地存储
    if (recordPassword.value) {
      Estore.set("logindata", {
        username: username.value,
        password: password.value,
      });
      Estore.set("recordPassword", recordPassword.value);
    } else {
      // 如果“记住密码”未选中，清除本地存储的凭据
      Estore.delete("logindata");
      Estore.set("recordPassword", recordPassword.value);
    }
    
    Estore.set("userData", userData);
    
    // 只在第一次登录/token过期后/切换账号时 存入token
    if (!Estore.get('token')) {
      console.log('只在第一次登录/token过期后/切换账号时 存入token');
      // 登录成功后将 token 存入本地存储
      const token = userData.token;
      Estore.set("token", token);
    }

    // 跳转到 '/monitoring' 页面
    ipcRenderer.send("login-access");
  } else {
    ElMessage({
      showClose: true,
      message: "用户名或密码错误！",
      type: "error",
      offset: 360
    });
  }
}

// 跳转至找回密码
function PWD() {
  ipcRenderer.send("PWD-open")
}

// 记住密码  在组件挂载时从本地存储加载保存的凭据并自动登录
onBeforeMount(() => {
  console.log(Estore.get('token'),Estore.get(recordPassword));
  recordPassword.value = Estore.get('recordPassword')
  // 判断是否记住密码
  if (Estore.get('recordPassword')) {
    let logindata = Estore.get('logindata')
    let savedUsername = logindata.username
    let savedPassword = logindata.password
    // 确保保存的信息有值
    if (savedUsername && savedPassword) {
      username.value = savedUsername;
      password.value = savedPassword;
    }
  }else{
    Estore.delete("token")  //若未记住密码，登录前清楚上次token，登录后存下新token
  }
});


</script>



<style lang="scss" scoped>
#loginBox {
  width: 375px;
  height: 480px;
  border: 1px solid rgb(217, 217, 218);
  border-radius: $border-radius;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

#logo {
  user-select: none;
  display: block;
  margin-top: 25px;
  // border: 1px solid black;
  -webkit-app-region: drag;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  height: 120px;

  img {
    // border: 1px solid black;
    width: 80px;
  }

  p {
    // border: 1px solid black;
    font-size: 27px;
    letter-spacing: 2px;
    color: rgb(1, 71, 175);
    margin: 0px;
  }
}

#main {
  margin-top: 35px;
}

.inputBox {
  width: 65%;
  text-align: left;
  margin: 10px auto;

  p {
    display: block;
    margin-bottom: 5px;
    user-select: none;
  }
}

#checkBox {
  width: 260px;
  margin: 20px auto !important;
  display: flex;
  justify-content: space-between;
}

#loginBtn {
  margin: 10px auto 0px;
  width: 140px;
  height: 45px;
  font-size: 20px;
  letter-spacing: 4px;
}
</style>