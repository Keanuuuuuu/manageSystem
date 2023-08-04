<template>
  <div id="wrapper">
    <div id="loginBox">
      <div id="logo">
        <img src="../assets/airCondition.png" />
        <p>中央空调集中管理平台</p>
      </div>
      <div id="main">
        <div class="inputBox">
          <p>用户名</p>
          <el-input v-model="username" clearable />
        </div>
        <div class="inputBox">
          <p>密码</p>
          <el-input
            v-model="password"
            clearable
            type="password"
            show-password
          />
        </div>
        <div id="checkBox">
          <el-checkbox v-model="checked1" label="记住密码" size="large" />
          <el-checkbox v-model="checked2" label="自动登录" size="large" />
        </div>
        <div id="loginBtn">
          <el-button color="#626aef" id="loginBtn" @click="handleLogin"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { post } from "../utils/http.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const checked1 = ref(false);
    const checked2 = ref(false);
    const store = useStore();
    const router = useRouter();
    const handleLogin = () => {
      const customUrl = "http://139.9.188.179:8002/api/login";
      // 转化为urlencode并且去除多余空格
      const postData = new URLSearchParams({
        username: username.value.trim(),
        password: password.value.trim(),
      });
      if (postData.get("username") === "" || postData.get("password") === "") {
        ElMessage({
          showClose: true,
          message: "输入的用户名或密码不能为空！",
          type: "error",
        });
      } else {
        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
        // console.log(postData.toString());
        post(customUrl, postData.toString(), config).then((res) => {
          console.log(res);
          if (res.msg === "success") {
            // 调用 Vuex 的 setRole mutation，将 role 存入 Vuex
            store.commit("setRole", res.role);
            // 跳转到 '/monitoring' 页面
            router.push("/monitoring");
          } else {
            ElMessage({
              showClose: true,
              message: "用户名或密码错误！",
              type: "error",
            });
          }
        });
      }
    };

    return {
      username,
      password,
      checked1,
      checked2,
      handleLogin,
    };
  },
};
</script>



<style lang="scss" scoped>
#wrapper {
  background-color: rgb(10, 9, 100);
  height: 100vh;
  #loginBox {
    width: 27%;
    min-width: 400px;
    height: 65%;
    min-height: 500px;
    border-radius: 10px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  #logo {
    display: block;
    margin-top: 30px !important;
    margin-bottom: 30px !important;
    img {
      width: 20%;
    }
    p {
      font-size: 30px;
      letter-spacing: 2px;
      color: rgb(1, 71, 175);
    }
  }
  .inputBox {
    // border: 1px solid black;
    width: 68%;
    text-align: left;
    margin: 10px auto !important;
    p {
      display: block;
      // border: 1px solid black;
      margin-bottom: 5px !important;
    }
  }
  #checkBox {
    width: 300px;
    margin: 20px auto !important;
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
  }
  #loginBtn {
    margin: 20px auto !important;
    width: 140px;
    height: 45px;
    font-size: 20px;
    letter-spacing: 4px;
  }
}
</style>