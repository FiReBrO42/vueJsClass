<template>
  <div class="col-8">
    <form id="form" @submit.prevent="sigin" class="form-signin">
      <div class="form-floating mb-3">
        <input
          v-model="user.username"
          type="email"
          class="form-control"
          id="username"
          placeholder="name@example.com"
          required
          autofocus
        />
        <label for="username">Email address</label>
      </div>
      <div class="form-floating">
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
        />
        <label for="password">Password</label>
      </div>
      <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
        登入
      </button>
    </form>
  </div>
</template>

<script>
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    sigin () {
      const apiUrl = `${VITE_APP_URL}/v2/admin/signin`
      this.$http
        .post(apiUrl, this.user)
        .then((res) => {
          const { token, expired } = res.data
          // 設定this.$http header全域默認設定
          this.$http.defaults.headers.common.Authorization = token
          // 設定cookie
          document.cookie = `firebro42=${token}; expires=${expired}`
          alert(res.data.message)
          // window.location = 'http://localhost:5173/#/admin'
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
