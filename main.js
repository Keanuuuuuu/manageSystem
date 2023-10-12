const { log } = require('console');
const { app, BrowserWindow, ipcMain, Menu } = require('electron')
// 在官方文档里可以查看这些模块的作用及用法

// const mainTemp = Menu.buildFromTemplate(require('./src/temp/menuTemp'))
// const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');

// // setup the titlebar main process
// setupTitlebar();

const path = require('path')
const NODE_ENV = process.env.NODE_ENV

// 持久化保存数据的库和初始化
const Store = require('electron-store');
Store.initRenderer()

console.log(NODE_ENV);

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

// 创建主进程窗口对象
let win = null  // 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被垃圾回收的时候，window对象将会自动的关闭
function createWindow() {
  win = new BrowserWindow({
    width: 2000,
    height: 1000,
    minHeight: 600,
    minWidth: 1000,
    // transparent: true, // 不显示html的元素区域设置透明色
    frame: false, // 用于自定义menu，设置为false可以将默认的菜单栏隐藏，包括叉、最小化、拖动与放大缩小
    autoHideMenuBar: true, // 在显示默认菜单的同时，隐藏那些Flie等菜单
    // titleBarStyle: 'hidden',
    // titleBarOverlay: true,
    webPreferences: {
      // sandbox: false,
      // preload: path.join(__dirname, 'preload.js')
      nodeIntegration: true,        //是否可以使用node.js的API
      contextIsolation: false       //隔离取消掉，把主进程和渲染进程打通
    },
    // icon: './public/favicon.ico', // 设置一个图片路径，可以自定义当前应用的显示图标
    title: '中央空调管理', // 自定义当前应用的标题
  })
  // win.setAspectRatio(1) //设置窗口保持的比例
  if (NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173/#/monitoring')
  } else {
    win.loadFile(NODE_ENV === 'development'
      ? 'http://localhost:5173/'
      : path.join(__dirname, 'dist/index.html'), {
      hash: 'monitoring'
    })
  }


  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// 创建登录窗口对象
let loginWindow = null
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    autoHideMenuBar: true,
    transparent: true,
    // resizable:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false       //隔离取消掉
    },
    // icon: './public/favicon.ico',
    title: '登录',
  })

  if (NODE_ENV === 'development') {
    loginWindow.loadURL('http://localhost:5173/#/login')
  } else {
    loginWindow.loadFile(NODE_ENV === 'development'
      ? 'http://localhost:5173/'
      : path.join(__dirname, 'dist/index.html'), {
      hash: 'login'
    })
  }

  loginWindow.on('closed', () => {
    loginWindow = null
    // if (loginWindow === null) {
    //   createWindow()
    // }
  })
}


// app相当于整个应用程序，拥有不同的生命周期
// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
// app.on('ready', createWindow)

app.on('ready', createLoginWindow)

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

// 登录进程与主进程间窗口的转换
ipcMain.on('login-deny', () => {
  if (win !== null) {
    win.hide()
    win = null
  }
  console.log(1);
  createLoginWindow()
})

ipcMain.on('login-access', () => {
  if (loginWindow !== null) {
    loginWindow.close()
    loginWindow = null
  }
  console.log(2);
  createWindow()
})

// 主进程窗口操作
ipcMain.on('window-min', () => {
  win.minimize()
})

ipcMain.on('window-close', () => {
  if (Dialog !== null) {
    Dialog.hide()
  }
  win.hide();
})

// 登录窗口操作
ipcMain.on('login-min', () => {
  loginWindow.minimize()
})

ipcMain.on('login-close', () => {
  if (loginWindow !== null) {
    loginWindow.hide()
  }
  loginWindow.hide();
})

let Dialog = null
ipcMain.on('openDialog', () => {
  console.log(Dialog);
  if (Dialog !== null) {
    Dialog.focus() // 存在 则聚焦
    return
  }
  Dialog = new BrowserWindow({
    width: 600,
    height: 700,
    // transparent: true, // 不显示html的元素区域设置透明色
    frame: false, // 用于自定义menu，设置为false可以将默认的菜单栏隐藏，包括叉、最小化、拖动与放大缩小
    autoHideMenuBar: true, // 在显示默认菜单的同时，隐藏那些Flie等菜单
    // parent: win,
    // modal: true,
    // titleBarStyle: 'hidden',
    // titleBarOverlay: true,
    webPreferences: {
      // sandbox: false,
      // preload: path.join(__dirname, 'preload.js')
      nodeIntegration: true,        //是否可以使用node.js的API
      contextIsolation: false       //隔离取消掉，把主进程和渲染进程打通
    },
    // icon: './public/favicon.ico', // 设置一个图片路径，可以自定义当前应用的显示图标
    title: '日志记载', // 自定义当前应用的标题
  })

  // Dialog.loadURL('http://localhost:5173/#/log')
  if (NODE_ENV === 'development') {
    Dialog.loadURL('http://localhost:5173/#/log')
  } else {
    Dialog.loadFile(NODE_ENV === 'development'
      ? 'http://localhost:5173/'
      : path.join(__dirname, 'dist/index.html'), {
      hash: 'log'
    })
  }

  // Dialog.webContents.openDevTools()

  ipcMain.on('log-window-min', () => {
    if (Dialog !== null) {
      Dialog.minimize()
    }
  })

  ipcMain.on('log-window-close', () => {
    if (Dialog !== null) {
      Dialog.hide()
      Dialog = null
    }
  })
})


