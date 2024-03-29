// 定义窗口对象的操作 最小化/还原/关闭

const { BrowserWindow } = require('electron');
const { mainWindowConfig, loginWindowConfig, PWDWindowConfig, dialogConfig,changeInfoDialogConfig, changePSWConfig } = require('./windowConfig');
const path = require('path')
const NODE_ENV = process.env.NODE_ENV


let windows = {
  mainWindow: null,
  loginWindow: null,
  PWDWindow: null,
  dialog: null,
  infoDialog:null
}


function createMainWindow() {
  windows.mainWindow = new BrowserWindow(mainWindowConfig);
  // 创建主窗口的逻辑...
  if (NODE_ENV === 'development') {
    windows.mainWindow.loadURL('http://localhost:5173/#/routes/overview')
  } else {
    windows.mainWindow.loadFile(NODE_ENV === 'development' ? 'http://localhost:5173/' : path.join(__dirname, 'dist/index.html'),
      {
        hash: '#/routes/overview'
      }
    )
  }
  // 当 window 被关闭，这个事件会被触发。
  windows.mainWindow.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，通常会把多个 window 对象存放在一个数组里面，与此同时，你应该删除相应的元素。
    windows.mainWindow = null
  })

  // windows.mainWindow.webContents.openDevTools()
}

function createLoginWindow() {
  windows.loginWindow = new BrowserWindow(loginWindowConfig);
  // 创建登录窗口的逻辑...
  if (NODE_ENV === 'development') {
    windows.loginWindow.loadURL('http://localhost:5173/#/dialog/login')
  } else {
    windows.loginWindow.loadFile(NODE_ENV === 'development' ? 'http://localhost:5173/' : path.join(__dirname, 'dist/index.html'),
      {
        hash: '#/dialog/login'
      })
  }

  windows.loginWindow.on('closed', () => {
    windows.loginWindow = null
  })

  // windows.loginWindow.webContents.openDevTools()
}

function createPWDWindow() {
  windows.PWDWindow = new BrowserWindow(PWDWindowConfig);
  // 创建忘记密码窗口的逻辑...
  if (NODE_ENV === 'development') {
    windows.PWDWindow.loadURL('http://localhost:5173/#/dialog/PWD')
  } else {
    windows.PWDWindow.loadFile(NODE_ENV === 'development' ? 'http://localhost:5173/' : path.join(__dirname, 'dist/index.html'),
      {
        hash: '#/dialog/PWD'
      })
  }

  windows.PWDWindow.on('closed', () => {
    windows.PWDWindow = null
  })

  // windows.PWDWindow.webContents.openDevTools()
}

function createDialog() {
  windows.dialog = new BrowserWindow(dialogConfig)
  // 创建日志弹窗逻辑...
  if (NODE_ENV === 'development') {
    windows.dialog.loadURL('http://localhost:5173/#/dialog/log')
  } else {
    windows.dialog.loadFile(NODE_ENV === 'development' ? 'http://localhost:5173/' : path.join(__dirname, 'dist/index.html'),
      {
        hash: '#/dialog/log'
      })
  }

  windows.dialog.on('closed', () => {
    windows.dialog = null
  })

  // windows.dialog.webContents.openDevTools()
}

function createChangeInfoDialog() {
  windows.infoDialog = new BrowserWindow(changeInfoDialogConfig)
  // 修改信息弹窗逻辑...
  if (NODE_ENV === 'development') {
    windows.infoDialog.loadURL('http://localhost:5173/#/dialog/changeInfo')
  } else {
    windows.infoDialog.loadFile(NODE_ENV === 'development' ? 'http://localhost:5173/' : path.join(__dirname, 'dist/index.html'),
      {
        hash: '#/dialog/changeInfo'
      })
  }

  windows.infoDialog.on('closed', () => {
    windows.infoDialog = null
  })

  // windows.infoDialog.webContents.openDevTools()
}

function createChangePSW() {
  windows.dialog = new BrowserWindow(changePSWConfig)
  // 创建日志弹窗逻辑...
  if (NODE_ENV === 'development') {
    windows.dialog.loadURL('http://localhost:5173/#/dialog/changePSW')
  } else {
    windows.dialog.loadFile(NODE_ENV === 'development' ? 'http://localhost:5173/' : path.join(__dirname, 'dist/index.html'),
      {
        hash: '#/dialog/changePSW'
      })
  }

  windows.dialog.on('closed', () => {
    windows.dialog = null
  })

  // windows.changePSW.webContents.openDevTools()
}

// 其他窗口的创建逻辑...

module.exports = {
  createMainWindow,
  createLoginWindow,
  createPWDWindow,
  createDialog,
  createChangeInfoDialog,
  createChangePSW,
  windows
};
