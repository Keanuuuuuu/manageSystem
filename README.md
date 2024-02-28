# manageSystem

https://github.com/AlexTorresDev/custom-electron-titlebar/wiki/CSS-Customization

https://leon-kfd.github.io/howdyjs/#/mouse-menu/readme

使用vueuse插件库中的一个插件@vueuse/electron 来完成渲染进程与主进程的通信

使用vite-plugin-electron插件


```
manageSystem                                    //
├─ electron.config.json                         //
├─ index.html                                   //
├─ main.js                                      //
├─ package-lock.json                            //
├─ package.json                                 //
├─ README.md                                    //
├─ src                                          //
│  ├─ api                                       //
│  │  ├─ authorize.js                           //
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
│  │  ├─ common                                 //
│  │  │  ├─ CustomMenu                          //
│  │  │  │  ├─ components                       //
│  │  │  │  │  ├─ Item.vue                      //
│  │  │  │  │  └─ Menu.vue                      //
│  │  │  │  └─ index.vue                        //
│  │  │  ├─ Navigator.vue                       //
│  │  │  └─ TitleBar                            //
│  │  │     ├─ loginTitleBar.vue                //
│  │  │     ├─ logTitleBar.vue                  //
│  │  │     ├─ mainTitleBar.vue                 //
│  │  │     └─ PWDTitleBar.vue                  //
│  │  └─ monitoring                             //
│  │     ├─ ControlComponents                   //
│  │     │  ├─ Monitor_display_control.vue      //
│  │     │  └─ Monitor_display_head.vue         //
│  │     ├─ Dialog                              //
│  │     │  ├─ addDialog.vue                    //
│  │     │  ├─ controlDialog.vue                //
│  │     │  ├─ deleteDialog.vue                 //
│  │     │  └─ intelligentControlDialog.vue     //
│  │     └─ leftTree.vue                        //
│  ├─ globalStyle.scss                          //
│  ├─ main.js                                   //
│  ├─ pages                                     //
│  │  ├─ dialog                                 //
│  │  │  ├─ log.vue                             //
│  │  │  ├─ login.vue                           //
│  │  │  └─ PWD.vue                             //
│  │  └─ routes                                 //
│  │     ├─ acount.vue                          //
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
├─ windowConfig.js                              //
└─ windowManager.js                             //

```