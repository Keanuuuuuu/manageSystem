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
    redirect:"/login"
  },
  {
    path:'/overview',
    component:Overview
  },
  {
    path:'/monitoring',
    component:Monitoring
  },
  {
    path:'/log',
    component:Log
  },
  {
    path:'/acount',
    component:Acount
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/findPWD',
    component:PWD
  },
  // ...其他路由配置
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router