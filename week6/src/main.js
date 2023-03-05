import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './style.css'
import App from './App.vue'
import router from './router'

// 匯入bootstrap
import './assets/all.scss'

import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
// 規則
import VeeValidateRules from '@vee-validate/rules'
// 語系
/* import { localize, loadLocaleFromURL } from '@vee-validate/i18n' */

/* loadLocaleFromURL('./zh_TW.json')

// configure 從 vee-validate 匯入，localize從@vee-validate/i18n匯入
configure({
  generateMessage: localize('zh_TW'), // 載入繁體中文語系
  validateOnInput: true
})
 */
// 帶入規則，VeeValidateRules 從 @vee-validate/rules 匯入
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== 'default') {
    defineRule(rule, VeeValidateRules[rule])
  }
})
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `${ctx.field} is required`,
      email: `${ctx.field} must be a valid email`
    }

    const message = messages[ctx.rule.name] || `Error validating ${ctx.field}`
    return message
  }
})

const app = createApp(App)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
// 插件引入axios VueAxios
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
