import { createRouter, createWebHashHistory } from 'vue-router'
import Overview from '../pages/overview.vue'
import Monitoring from '../pages/monitoring.vue'
import Log from '../pages/log.vue'
import ID from '../pages/id.vue'

const routes = [
  {
    path:'/',
    redirect:"/overview"
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
  // ...其他路由配置
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
