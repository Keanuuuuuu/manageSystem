import axios from 'axios'

const instance = axios.create({
    // 配置请求根路径
    baseURL: 'http://42.194.182.155:8088',
    // 配置超时时间
    timeout: 5000,
    // 配置请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config
  },
  error => {
    // 对请求错误做些什么
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
    // 对响应错误做点什么
    console.log(error) // 打印错误信息
    return Promise.reject(error)
  }
)

export function get(url, params) {
    return instance.get(url, {
      params    
    })
}

export function post(url, data) {
    return instance.post(url, data)
}

export function del(url) {
    return instance.delete(url)
}

export function put(url, data) {
    return instance.put(url, data)
}