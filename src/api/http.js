import axios from 'axios'
import { ElMessage } from "element-plus";
import { authorizeGet } from './authorize'
const Store = require('electron-store');
const Estore = new Store();

const instance = axios.create({
  // 配置请求根路径
  baseURL: 'http://lab.zhongyaohui.club/',
  // 配置超时时间
  timeout: 50000,
  // 配置请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})


// 请求拦截器 在发送请求之前做些什么
instance.interceptors.request.use((config) => {
  //鉴权函数 token失效后跳转至login
  authorizeGet()
  const token = Estore.get('token')
  config.headers.token = token
  return config
},
  error => {
    // 对请求错误做些什么
    ElMessage({
      showClose: true,
      message: `"${error}"`,
      type: "error",
    });
    console.log(error) // 打印错误信息
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data
  },
  error => {
    // 对响应错误做点什么，是否触发错误是通过状态码来判断的
    ElMessage({
      showClose: true,
      message: `"${error}"`,
      type: "error",
    });
    console.log(error) // 打印错误信息
    return Promise.reject(error)
  }
)


export function get(url, params = {}) {
  return instance.get(url, {
    params
  })
}

export function post(url, postData, postUrl) {
  return instance.post(url, postData, postUrl)
}

export function del(url,data,delUrl) {
  let deleteData = {data}  //接口原因 需要再包裹一层对象
  return instance.delete(url,deleteData,delUrl)
}

export function put(url, data) {
  return instance.put(url, data)
}