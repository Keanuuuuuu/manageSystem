// vue的main.js

import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia();

app.use(pinia);
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
