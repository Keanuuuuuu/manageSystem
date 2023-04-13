const { app, BrowserWindow,ipcMain } = require('electron')
// 在官方文档里可以查看这些模块的作用及用法

const path = require('path')
 
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 2000,
    height: 1000,
    // webPreferences: {
    //   nodeIntegration: true,        //是否可以使用node.js的API
    //   contextIsolation: false       //隔离取消掉，把主进程和渲染进程打通
    // }
    // frame: false, // 隐藏顶部栏
    // transparent: true, // 不显示html的元素区域设置透明色
  })
  // win.setAspectRatio(1) //设置窗口保持的比例
 
  // 加载index.html文件
  //   win.loadFile('./index.html')  //就是根据这句加载你创建的index.html的
  // win.loadFile(path.resolve(__dirname,'/src/index.html')) // 或者这样写，来适应不同操作系统的路径

  win.loadURL('http://localhost:3000/')
  // win.loadURL('http://192.168.0.140:3000/')
 
  // 打开开发者工具
  win.webContents.openDevTools()
 
  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}
 

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  })
  loginWindow.loadFile('./login.html')
  loginWindow.on('closed', () => {
    // loginWindow = null
    // if (loginWindow === null) {
    //   createWindow()
    // }
  })
}

  
// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)
// app.on('ready', createLoginWindow)
 
// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
 
app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})
 
// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。