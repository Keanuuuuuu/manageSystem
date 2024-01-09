// 配置窗口对象

const path = require('path')

exports.mainWindowConfig = {
  width: 2000,
  height: 1000,
  minHeight: 600,
  frame: false, // 用于自定义menu，设置为false可以将默认的菜单栏隐藏，包括叉、最小化、拖动与放大缩小
  autoHideMenuBar: true, // 在显示默认菜单的同时，隐藏那些Flie等菜单
  webPreferences: {
    nodeIntegration: true,        //是否可以使用node.js的API
    contextIsolation: false       //隔离取消掉，把主进程和渲染进程打通
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'), 
  title: '中央空调集中管理平台', 
}

exports.loginWindowConfig = {
  width: 385,
  height: 490,
  frame: false,
  autoHideMenuBar: true,
  transparent: true,
  resizable: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false  
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'),
  title: '登录',
}

exports.findPWDWindowConfig = {
  width: 2000,
  height: 1000,
  minHeight: 600,
  minWidth: 1000,
  frame: false, 
  autoHideMenuBar: true, 
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'),
  title: '忘记密码',
}

exports.dialogConfig = {
  width: 600,
  height: 700,
  frame: false,
  autoHideMenuBar: true, 
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'),
  title: '日志记载', // 自定义当前应用的标题
}
