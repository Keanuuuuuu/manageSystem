// 配置窗口对象

const path = require('path')

exports.mainWindowConfig = {
  minWidth:1055,
  minHeight: 710,
  center:true,
  frame: false, // 用于自定义menu，设置为false可以将默认的菜单栏隐藏，包括叉、最小化、拖动与放大缩小
  autoHideMenuBar: true, // 在显示默认菜单的同时，隐藏那些Flie等菜单
  transparent: true,
  webPreferences: {
    nodeIntegration: true,        //是否可以使用node.js的API
    contextIsolation: false,       //隔离取消掉，把主进程和渲染进程打通
    devTools: true   
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'), 
  title: '中央空调集中管理平台', 
}

exports.loginWindowConfig = {
  width: 380,
  height: 485,
  center:true,
  frame: false,
  autoHideMenuBar: true,
  transparent: true,
  resizable: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    devTools: true   
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'),
  title: '登录',
}

exports.PWDWindowConfig = {
  minWidth:1000,
  minHeight: 710,
  center:true,
  frame: false, 
  autoHideMenuBar: true, 
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    devTools: true   
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'),
  title: '忘记密码',
}

exports.dialogConfig = {
  width: 600,
  height: 700,
  center:true,
  frame: false,
  autoHideMenuBar: true, 
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    devTools: true   
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'),
  title: '日志记载', // 自定义当前应用的标题
}

exports.changeInfoDialogConfig = {
  width: 500,
  height: 400,
  center:true,
  frame: false,
  autoHideMenuBar: true, 
  resizable: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    devTools: true   
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'),
  title: '修改信息', // 自定义当前应用的标题
}

exports.changePSWConfig = {
  width: 400,
  height: 400,
  center:true,
  frame: false,
  autoHideMenuBar: true, 
  resizable: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    devTools: true   
  },
  icon: path.join(__dirname,'./src/assets/airCondition.png'),
  title: '修改密码', // 自定义当前应用的标题
}