import { createRouter, createWebHashHistory } from 'vue-router'
import Overview from '../pages/overview.vue'
import Monitoring from '../pages/monitoring.vue'
import Log from '../pages/log.vue'
import ID from '../pages/id.vue'
import Login from '../pages/login.vue'

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
    path:'/id',
    component:ID
  },
  {
    path:'/login',
    component:Login
  },
  // ...其他路由配置
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router