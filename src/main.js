import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import store from './store/index.js'
import router from './router/index'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

 const app = createApp(App)
 app.use(store)
 app.use(router)
 app.use(ElementPlus)
 app.mount('#app')
