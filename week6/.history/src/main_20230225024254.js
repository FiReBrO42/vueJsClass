import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from './router'

/* 匯入bootstrap */
import './assets/all.scss'

const app = createApp(App)

app.use(router)
app.mount('#app')
