import axios from 'axios'
import { ElMessage } from "element-plus";
import { ElLoading } from "element-plus";
import { authorizeGet } from './authorize'


const instance = axios.create({
  // 配置请求根路径
  baseURL: 'https://lab.bitstone14.xyz',
  // 配置超时时间
  timeout: 100000,
  // 配置请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})


export function setupInterceptors(router) {
  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      // 在发送请求之前做些什么
      //鉴权函数 token失效后跳转至login
      authorizeGet(router)
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
      ElLoading.service().close();
      return Promise.reject(error)
    }
  )
}



export function get(url, params = {}) {
  return instance.get(url, {
    params
  })
}

export function post(url, data, headers) {
  const config = headers ? headers : {}
  return instance.post(url, data, config)
}

export function del(url) {
  return instance.delete(url)
}

export function put(url, data) {
  return instance.put(url, data)
}