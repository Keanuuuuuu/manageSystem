import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import store from './store/index.js'
import router from './router/index'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {setupInterceptors} from './utils/http.js'
import 'default-passive-events'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
