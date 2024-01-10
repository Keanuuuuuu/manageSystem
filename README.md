# manageSystem

https://github.com/AlexTorresDev/custom-electron-titlebar/wiki/CSS-Customization

https://leon-kfd.github.io/howdyjs/#/mouse-menu/readme

使用vueuse插件库中的一个插件@vueuse/electron 来完成渲染进程与主进程的通信

使用vite-plugin-electron插件



```
manageSystem                                 //
├─ .npmrc                                    //
├─ electron.config.json                      //
├─ index.html                                //
├─ main.js                                   //
├─ package-lock.json                         //
├─ package.json                              //
├─ README.md                                 //
├─ src                                       //
│  ├─ api                                    //
│  │  ├─ authorize.js                        //
│  │  └─ http.js                             //
│  ├─ App.vue                                //
│  ├─ assets                                 //
│  │  ├─ airCondition.png                    //
│  │  └─ logo.ico                            //
│  ├─ components                             //
│  │  ├─ arti.vue                            //
│  │  ├─ ControlComponents                   //
│  │  │  ├─ Monitor_display_control.vue      //
│  │  │  └─ Monitor_display_head.vue         //
│  │  ├─ CustomMenu                          //
│  │  │  ├─ components                       //
│  │  │  │  ├─ Item.vue                      //
│  │  │  │  └─ Menu.vue                      //
│  │  │  └─ index.vue                        //
│  │  ├─ Dialog                              //
│  │  │  ├─ addDialog.vue                    //
│  │  │  ├─ controlDialog.vue                //
│  │  │  ├─ deleteDialog.vue                 //
│  │  │  └─ intelligentControlDialog.vue     //
│  │  └─ TitleBar                            //
│  │     ├─ loginTitleBar.vue                //
│  │     ├─ logTitleBar.vue                  //
│  │     ├─ mainTitleBar.vue                 //
│  │     └─ PWDTitleBar.vue                  //
│  ├─ data                                   //
│  │  └─ overview                            //
│  │     ├─ machineStatus.js                 //
│  │     └─ reloadTime.js                    //
│  ├─ globalStyle.scss                       //
│  ├─ index.css                              //
│  ├─ main.js                                //
│  ├─ pages                                  //
│  │  ├─ acount.vue                          //
│  │  ├─ findPWD.vue                         //
│  │  ├─ log.vue                             //
│  │  ├─ login.vue                           //
│  │  ├─ monitoring.vue                      //
│  │  └─ overview.vue                        //
│  ├─ router                                 //
│  │  └─ index.js                            //
│  ├─ store                                  //
│  │  └─ index.js                            //
│  ├─ temp                                   //
│  │  └─ menuTemp.js                         //
│  └─ utils                                  //
│     ├─ ConcurrencyRequest.js               //
│     ├─ digitalTransformation.js            //
│     ├─ systemEventBus.js                   //
│     ├─ Throttling.js                       //
│     ├─ token.js                            //
│     └─ treeArr.js                          //
├─ vite.config.js                            //
├─ windowConfig.js                           //
└─ windowManager.js                          //

```