// vue的main.js

import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import zhCn from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App)

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus, {
    locale: zhCn,
  })
// app.use(zhCn);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
