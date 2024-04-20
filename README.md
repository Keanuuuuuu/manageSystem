# manageSystem

## 项目主要技术栈

+ 前端框架： [vue3](https://vuejs.org/) & [electron](https://www.electronjs.org/zh/)
+ 构建工具： [Vite](https://vitejs.dev/)
+ css 预处理器： [scss](https://sass-lang.com/)
+ 状态管理工具：[pinia](https://pinia.vuejs.org/)
+ 组件库：[element plus](https://element-plus.org/zh-CN/)



## 项目运行逻辑

本项目使用vueuse插件库中的一个插件@vueuse/electron 来完成渲染进程与主进程的通信

Electron 应用的主进程（main.js）负责管理整个应用的生命周期和窗口管理，而窗口管理的具体逻辑被拆分到了 windowManager.js 中，窗口的配置信息则被拆分到了 windowConfig.js 中

![process.png](https://github.com/itawenya/pic/blob/main/process.png?raw=true)

在本项目中，将弹窗类型定义为`dialog`，路由类型定义为`routes`

在`customMenu/index.vue`中定义`dialog/routes`类型，`customMenu/menu.vue`监听并判断`customMenu/item.vue`的点击类型，向`navigator`组件通信，在`navigator`组件中执行路由跳转或者窗口操作



## 项目运行

1. 安装依赖

```
# npm
npm i --registry=https://registry.npmmirror.com

# pnpm
pnpm i --registry=https://registry.npmmirror.com
```



1. 运行程序

```
# 运行项目
npm run dev

# 打包文件 输出文件为dist_electron
npm run electron:build

```





## 项目结构


```
manageSystem                                    //
├─ .npmrc                                       //
├─ electron.config.json                         // 有关electron打包的配置
├─ index.html                                   //
├─ main.js                                      // electron的main.js 监听并执行窗口最大化、最小化等操作
├─ package-lock.json                            //
├─ package.json                                 //
├─ README.md                                    //
├─ src                                          //
│  ├─ api                                       //
│  │  ├─ authorize.js                           // 鉴权专用请求
│  │  └─ http.js                                //
│  ├─ App.vue                                   //
│  ├─ assets                                    //
│  │  ├─ airCondition.png                       //
│  │  ├─ AirConditioner-Filled-bad.png          //
│  │  ├─ AirConditioner-work.png                //
│  │  ├─ logo.ico                               //
│  │  └─ logo.png                               //
│  ├─ components                                //
│  │  ├─ account                                //
│  │  │  ├─ addDialog.vue                       //
│  │  │  ├─ delDialog.vue                       //
│  │  │  └─ editDialog.vue                      //
│  │  ├─ common                                 //
│  │  │  ├─ CustomMenu                          // 定制化菜单栏
│  │  │  │  ├─ components                       //
│  │  │  │  │  ├─ Item.vue                      //
│  │  │  │  │  └─ Menu.vue                      //
│  │  │  │  └─ index.vue                        //
│  │  │  ├─ Navigator.vue                       // 导航栏
│  │  │  └─ TitleBar                            //
│  │  │     ├─ changeInfoTitleBar.vue           //
│  │  │     ├─ changePSWTitleBar.vue            //
│  │  │     ├─ loginTitleBar.vue                //
│  │  │     ├─ logTitleBar.vue                  //
│  │  │     ├─ mainTitleBar.vue                 //
│  │  │     └─ PWDTitleBar.vue                  //
│  │  └─ monitoring                             //
│  │     ├─ ControlComponents                   // 内机监控看板上方数据组件
│  │     │  ├─ Monitor_display_control.vue      // 按钮操控组件 状态刷新、实时控制、智能控制
│  │     │  └─ Monitor_display_head.vue         // 数据展示组件
│  │     ├─ Dialog                              //
│  │     │  ├─ addDialog.vue                    // 新增节点
│  │     │  ├─ changeDialog.vue                 // 修改节点
│  │     │  ├─ controlDialog.vue                // 实时控制
│  │     │  ├─ deleteDialog.vue                 //  删除节点
│  │     │  └─ intelligentControlDialog.vue     // 智能控制
│  │     └─ leftTree.vue                        // 内机监控中左侧树形组件
│  ├─ globalStyle.scss                          // 全局变量样式
│  ├─ main.js                                   // vue的main.js
│  ├─ pages                                     //
│  │  ├─ dialog                                 // 弹窗类型页面
│  │  │  ├─ changeInfo.vue                      //
│  │  │  ├─ changePSW.vue                       //
│  │  │  ├─ log.vue                             //
│  │  │  ├─ login.vue                           //
│  │  │  └─ PWD.vue                             //
│  │  └─ routes                                 // 路由类型页面
│  │     ├─ account.vue                         //
│  │     ├─ dataStatistics.vue                  //
│  │     ├─ monitoring.vue                      //
│  │     └─ overview.vue                        //
│  ├─ router                                    //
│  │  └─ index.js                               //
│  ├─ store                                     //
│  │  ├─ index.js                               //
│  │  └─ use-intelligent.js                     //
│  ├─ type                                      //
│  │  └─ intelligentType.js                     //
│  └─ utils                                     //
│     ├─ ConcurrencyRequest.js                  //
│     ├─ digitalTransformation.js               //
│     ├─ systemEventBus.js                      //
│     ├─ Throttling.js                          //
│     ├─ token.js                               //
│     └─ treeArr.js                             //
├─ vite.config.js                               //
├─ windowConfig.js                              // 配置窗口信息 宽高等
└─ windowManager.js                             // 定义窗口对象的操作 最小化/还原/关闭

```