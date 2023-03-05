import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './style.css'
import App from './App.vue'
import router from './router'

// 匯入bootstrap
import './assets/all.scss'

const app = createApp(App)

// 插件引入axios VueAxios
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
