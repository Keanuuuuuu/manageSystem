import { createRouter, createWebHashHistory } from 'vue-router'

import Overview from '../pages/routes/overview.vue'
import Monitoring from '../pages/routes/monitoring.vue'
import Account from '../pages/routes/account.vue'
import DataStatistics from '../pages/routes/dataStatistics.vue'
import DeviceSearch from '../pages/routes/deviceSearch.vue'

import Log from '../pages/dialog/log.vue'
import PWD from '../pages/dialog/PWD.vue'
import Login from '../pages/dialog/login.vue'
import changeInfo from '../pages/dialog/changeInfo.vue'
import ChangePSW from '../pages/dialog/changePSW.vue'
import overviewLog from '../pages/dialog/overviewLog.vue'


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
        name: '总览',
        component: Overview
      },
      {
        path: 'monitoring',
        name: '内机监控',
        component: Monitoring
      },
      {
        path: 'account',
        name: '账号管理',
        component: Account
      },
      {
        path: 'dataStatistics',
        name: '数据统计',
        component: DataStatistics
      },
      {
        path: 'deviceSearch',
        name: '设备查询',
        component: DeviceSearch
      },
    ]
  },
  {
    path: '/dialog',
    children: [
      {
        path: 'log',
        name: '日志查询',
        component: Log
      },
      {
        path: 'login',
        name: '登录页',
        component: Login
      },
      {
        path: 'PWD',
        name: '找回密码',
        component: PWD
      },
      {
        path: 'changeInfo',
        name: '修改信息',
        component: changeInfo
      },
      {
        path: 'changePSW',
        name: '修改密码',
        component: ChangePSW
      },
      {
        path: 'overviewLog',
        name: '中央空调内机运行信息',
        component: overviewLog
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router