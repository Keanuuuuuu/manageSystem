import { createRouter, createWebHashHistory } from 'vue-router'

import Overview from '../pages/overview.vue'
import Monitoring from '../pages/monitoring.vue'
import Log from '../pages/log.vue'
import Acount from '../pages/acount.vue'
import Login from '../pages/login.vue'
import PWD from '../pages/findPWD.vue'

const routes = [
  {
    path: '/',
    redirect: "/dialog/login",
    name: '起始页'
  },
  {
    path: '/routes',
    children: [
      {
        path: 'overview',
        name: '页面总览',
        component: Overview
      },
      {
        path: 'monitoring',
        name: '内机监控',
        component: Monitoring
      },
      {
        path: 'acount',
        name: '账号管理',
        component: Acount
      },
    ]
  },
  {
    path: '/dialog',
    children: [
      {
        path: 'log',
        name: '日志管理',
        component: Log
      },
      {
        path: 'login',
        name: '登录页',
        component: Login
      },
      {
        path: 'findPWD',
        name: '找回密码',
        component: PWD
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router