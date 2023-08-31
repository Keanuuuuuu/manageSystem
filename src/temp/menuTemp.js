const { shell } = require('electron') 

const template = [
  {
    label: '文件',
    submenu: [
      {
        label: '保存',
        acceletator: 'CmdOrCtrl+N',
        click(menuItem, browserWindow, event){
          console.log(menuItem);
          browserWindow.webContents.send('execute-create-file')
          // 以上这一句是主进程往渲染进程发送事件，因为原生菜单由主进程触发，由渲染进程去执行
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ]
  },  
  {
    label: '工具',
    submenu: [
      {
        label: '日记记载',
        acceletator: 'CmdOrCtrl+N',
        click(menuItem, browserWindow, event){
          browserWindow.webContents.send('execute-create-file')
        }
      },
      {
        label: '日记记载',
        acceletator: 'CmdOrCtrl+N',
        click(menuItem, browserWindow, event){
          browserWindow.webContents.send('execute-create-file')
        }
      }
    ]
  },
  {
    label: '帮助',
    submenu: [
      { role: 'copy' },
      // role指的是调用系统自带的功能
      { 
        label:'全屏',
        role:'toggleFullScreen'
      }
    ]
  }
]

module.exports = template