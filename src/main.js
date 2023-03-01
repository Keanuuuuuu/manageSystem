import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import store from './store/index.js'
import router from './router/index'

 const app = createApp(App)
 app.mount('#app')
 app.use(store)
 app.use(router)
