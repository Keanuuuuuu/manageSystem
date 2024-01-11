import { createRouter, createWebHashHistory } from 'vue-router'

import Overview from '../pages/overview.vue'
import Monitoring from '../pages/monitoring.vue'
import Log from '../pages/log.vue'
import Acount from '../pages/acount.vue'
import Login from '../pages/login.vue'
import PWD from '../pages/findPWD.vue'

const routes = [
  {
    path:'/',
    redirect:"/login",
    name:'起始页'
  },
  {
    path:'/overview',
    name:'页面总览',
    component:Overview
  },
  {
    path:'/monitoring',
    name:'内机监控',
    component:Monitoring
  },
  {
    path:'/log',
    name:'日志管理',
    component:Log
  },
  {
    path:'/acount',
    name:'账号管理',
    component:Acount
  },
  {
    path:'/login',
    name:'登录页',
    component:Login
  },
  {
    path:'/findPWD',
    name:'找回密码',
    component:PWD
  },
  // ...其他路由配置
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router