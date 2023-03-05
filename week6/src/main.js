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
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// 帶入規則，VeeValidateRules 從 @vee-validate/rules 匯入
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== 'default') {
    defineRule(rule, VeeValidateRules[rule])
  }
})
// configure 從 vee-validate 匯入，localize從@vee-validate/i18n匯入
configure({
  // Generates an English message locale generator
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

/* configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `${ctx.field} is required`,
      email: `${ctx.field} must be a valid email`
    }

    const message = messages[ctx.rule.name] || `Error validating ${ctx.field}`
    return message
  }
}) */

const app = createApp(App)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
// 插件引入axios VueAxios
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
