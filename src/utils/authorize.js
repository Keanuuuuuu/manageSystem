import { get } from "../utils/http.js";
import { ElMessage } from "element-plus";


// 标识是否已经获取了token
let tokenFetched = false;

// 构建动态的 apiUrl
const apiUrlTemplate = 'http://lab.zhongyaohui.club/login/{token}';

// 封装的方法，发送带有 Token 的 GET 请求
export function authorizeGet(router) {

  if (!tokenFetched) {
    const token = localStorage.getItem('token');
    if (token) {
      const apiUrl = apiUrlTemplate.replace('{token}', token);
      tokenFetched = true;
      console.log("开始");
      get(apiUrl).then((res) => {
        if (res.code === 21401) {
          router.push("/login");
          ElMessage({
            showClose: true,
            message: "token失效，请重新登录！",
            type: "error",
          });
        }
      })
    }
  }
}
