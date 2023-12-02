import axios from 'axios'
import { ElMessage } from "element-plus";
import { authorizeGet } from './authorize'

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

const instanceTwo = axios.create({
  // 配置请求根路径
  baseURL: 'http://lab.bitstone14.xyz/',
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
  if (config.auth) { // 如果设置了标志，直接返回配置，不触发拦截器
    return config
  } else {
    authorizeGet()
    return config
  }
},
  error => {
    // 对请求错误做些什么
    ElMessage({
      showClose: true,
      message: `"${error}"`,
      type: "error",
    });
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
    return Promise.reject(error)
  }
)

// 请求拦截器 在发送请求之前做些什么
instanceTwo.interceptors.request.use((config) => {
  //鉴权函数 token失效后跳转至login
  if (config.auth) { // 如果设置了标志，直接返回配置，不触发拦截器
    return config
  } else {
    authorizeGet()
    return config
  }
},
  error => {
    // 对请求错误做些什么
    ElMessage({
      showClose: true,
      message: `"${error}"`,
      type: "error",
    });
    return Promise.reject(error)
  }
)

// 响应拦截器
instanceTwo.interceptors.response.use(
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
    return Promise.reject(error)
  }
)

export function copyGet(url, params = {}) {
  return instance.get(url, {
    params
  })
}

export function copyPost(url, data, headers) {
  const config = headers ? headers : {}
  return instance.post(url, data, config)
}

export function copyPostTwo(url, data, headers) {
  const config = headers ? headers : {}
  return instanceTwo.post(url, data, config)
}

export function copyDel(url, data) {
  const config = {
    data
  }
  return instance.delete(url,  config)
}

export function copyPut(url, data) {
  return instance.put(url, data)
}