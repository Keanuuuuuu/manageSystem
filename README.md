# manageSystem

https://github.com/AlexTorresDev/custom-electron-titlebar/wiki/CSS-Customization

https://leon-kfd.github.io/howdyjs/#/mouse-menu/readme

使用vueuse插件库中的一个插件@vueuse/electron 来完成渲染进程与主进程的通信

使用vite-plugin-electron插件


```
manageSystem                                    //
├─ .npmrc                                       //
├─ electron.config.json                         //有关electron打包的配置
├─ index.html                                   //
├─ main.js                                      //electron的main.js 监听并执行窗口最大化、最小化等操作
├─ package-lock.json                            //
├─ package.json                                 //
├─ README.md                                    //
├─ src                                          //
│  ├─ api                                       //
│  │  ├─ authorize.js                           //鉴权专用请求
│  │  └─ http.js                                //
│  ├─ App.vue                                   //
│  ├─ assets                                    //
│  │  ├─ airCondition.png                       //
│  │  ├─ error.png                              //
│  │  ├─ logo.ico                               //
│  │  ├─ logo.png                               //
│  │  ├─ off.png                                //
│  │  └─ work.png                               //
│  ├─ components                                //
│  │  ├─ account                                //
│  │  │  ├─ addDialog.vue                       //
│  │  │  ├─ delDialog.vue                       //
│  │  │  └─ editDialog.vue                      //
│  │  ├─ common                                 //
│  │  │  ├─ CustomMenu                          //定制化菜单栏
│  │  │  │  ├─ components                       //
│  │  │  │  │  ├─ Item.vue                      //
│  │  │  │  │  └─ Menu.vue                      //
│  │  │  │  └─ index.vue                        //
│  │  │  ├─ Navigator.vue                       //导航栏
│  │  │  └─ TitleBar                            //
│  │  │     ├─ changeInfoTitleBar.vue           //
│  │  │     ├─ changePSWTitleBar.vue            //
│  │  │     ├─ loginTitleBar.vue                //
│  │  │     ├─ logTitleBar.vue                  //
│  │  │     ├─ mainTitleBar.vue                 //
│  │  │     └─ PWDTitleBar.vue                  //
│  │  └─ monitoring                             //
│  │     ├─ ControlComponents                   //内机监控看板上方数据组件
│  │     │  ├─ Monitor_display_control.vue      //按钮操控组件 状态刷新、实时控制、智能控制
│  │     │  └─ Monitor_display_head.vue         //数据展示组件
│  │     ├─ Dialog                              //
│  │     │  ├─ addDialog.vue                    //新增节点
│  │     │  ├─ controlDialog.vue                //实时控制
│  │     │  ├─ deleteDialog.vue                 //删除节点
│  │     │  └─ intelligentControlDialog.vue     //智能控制
│  │     └─ leftTree.vue                        //内机监控中左侧树形组件
│  ├─ globalStyle.scss                          //全局变量样式
│  ├─ main.js                                   //vue的main.js
│  ├─ pages                                     //
│  │  ├─ dialog                                 //弹窗类型
│  │  │  ├─ changeInfo.vue                      //
│  │  │  ├─ changePSW.vue                       //
│  │  │  ├─ log.vue                             //
│  │  │  ├─ login.vue                           //
│  │  │  └─ PWD.vue                             //
│  │  └─ routes                                 //路由类型
│  │     ├─ account.vue                         //
│  │     ├─ dataStatistics.vue                  //
│  │     ├─ monitoring.vue                      //
│  │     └─ overview.vue                        //
│  ├─ router                                    //
│  │  └─ index.js                               //
│  ├─ store                                     //
│  │  └─ index.js                               //
│  └─ utils                                     //
│     ├─ ConcurrencyRequest.js                  //
│     ├─ digitalTransformation.js               //
│     ├─ systemEventBus.js                      //
│     ├─ Throttling.js                          //
│     ├─ token.js                               //
│     └─ treeArr.js                             //
├─ vite.config.js                               //
├─ windowConfig.js                              //配置窗口信息 宽高等
└─ windowManager.js                             //定义窗口对象的操作 最小化/还原/关闭

```