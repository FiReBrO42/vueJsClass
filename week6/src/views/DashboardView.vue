<template>
  <router-link to="/admin/products">後台產品頁面</router-link> |
  <router-link to="/admin/orders">後台訂單頁面</router-link> |
  <router-link to="/">前台</router-link>
  <div>這是!!後台!!頁面</div>
  <a href="#" @click.prevent="logout()">登出</a>
  <hr />

  <RouterView></RouterView>
</template>

<script>
// 引入 RouterView
import { RouterView } from 'vue-router'
const { VITE_APP_URL } = import.meta.env
export default {
  components: {
    RouterView
  },
  methods: {
    logout () {
      // 清空cookie
      document.cookie = `firebro42=; expires=${new Date()}`
      this.$router.push('/login')
    },
    // 檢查
    checkApi () {
      // 取出cookie的token ，正則中間是COOKIE名稱
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)firebro42\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      // 設定axios header全域默認設定，
      this.$http.defaults.headers.common.Authorization = token

      const url = `${VITE_APP_URL}/api/user/check`
      this.$http.post(url).then((res) => {
        console.log(res)
        // 如果驗證沒有過，就會跳轉
        if (!res.data.success) {
          alert(res.data.message)
          this.$router.push('/login')
        }
      })
    }
  },
  mounted () {
    this.checkApi()
  }
}
</script>
