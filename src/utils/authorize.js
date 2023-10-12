import { get } from "../utils/http.js";
import { ElMessage } from "element-plus";
import { useIpcRenderer } from "@vueuse/electron";
import systemEventBus from '../systemEventBus';

const Store = require('electron-store');
const Estore = new Store();
const ipcRenderer = useIpcRenderer();
let token = '保存在authorize的token'

// 标识是否已经获取了token
let tokenFetched = false;

// 构建动态的 apiUrl
const apiUrlTemplate = 'http://lab.zhongyaohui.club/login/{token}';

// 封装的方法，发送带有 Token 的 GET 请求
export function authorizeGet(router) {
  // 如果有token
  if (!tokenFetched) {
    token = Estore.get('token')
    // 且token有值
    if (token) {
      const apiUrl = apiUrlTemplate.replace('{token}', token);
      tokenFetched = true;
      get(apiUrl).then((res) => {
        console.log(res);
        // token失效则跳转至登录页
        if (res.code === 21401) {
          ElMessage({
            showClose: true,
            message: "token失效，请重新登录！",
            type: "error",
          });
          setTimeout(() => {
            ipcRenderer.send("login-deny");
          }, 1000);
          // send a message 重新创建登录窗口，并关闭主窗口
        }
      })
    }
  }
}
