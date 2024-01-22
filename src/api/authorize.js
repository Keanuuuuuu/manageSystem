import axios from 'axios'
import { ElMessage } from "element-plus";
import { useIpcRenderer } from "@vueuse/electron";

const Store = require('electron-store');
const Estore = new Store();
const ipcRenderer = useIpcRenderer();

// 创建一个auth专用axios实例，绕开请求拦截器避免死循环
const authInstance = axios.create({
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

function authGet(url) {
  return authInstance.get(url)
}

// 封装的方法，发送带有 Token 的 GET 请求
export async function authorizeGet() {
  // console.log('进入鉴权');
  const token = Estore.get('token')
  // console.log(token);
  // token有值
  if (token) {
    // 构建动态的 apiUrl
    const apiUrlTemplate = 'http://lab.zhongyaohui.club/login/{token}';
    const apiUrl = apiUrlTemplate.replace('{token}', token);
    await authGet(apiUrl).then((res) => {
      // console.log(res.data.code);
      // token失效则清空token凭据并跳转至登录页
      if (res.data.code === 21401) {
        Estore.set("token", null);
        ElMessage({
          showClose: true,
          message: "token失效，请重新登录！",
          type: "error",
        });
        // send a message 重新创建登录窗口，并关闭主窗口
        setTimeout(() => {
          // console.log('失效了=================》');
          ipcRenderer.send("login-deny");
        }, 1000);
      }
    })
  }
}
