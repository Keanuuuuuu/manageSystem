import { get } from "../utils/http.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

// 标识是否已经获取了token
let tokenFetched = false;

// 构建动态的 apiUrl
const apiUrlTemplate = 'http://127.0.0.1:4523/m1/3191778-0-default/login/{token}';

// 封装的方法，发送带有 Token 的 GET 请求
export function authorizeGet() {

  if (!tokenFetched) {
    const token = localStorage.getItem('token');
    if (token) {
      const apiUrl = apiUrlTemplate.replace('{token}', token);
      tokenFetched = true;
      console.log("开始");
      get(apiUrl).then((res) => {
        if (res.code === 21401) {
          const router = useRouter();
          ElMessage({
            showClose: true,
            message: "token失效，请重新登录！",
            type: "error",
          });
          router.push("/login");
        }
      })
    }
  }
}
