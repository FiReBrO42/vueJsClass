<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link to="/products">產品列表</router-link> |
  <router-link to="/cart">購物車</router-link> |
  <router-link to="/login">登入</router-link> |
  <router-link to="/admin">後台</router-link>

  <div>這是前台頁面</div>
  <hr />
  <RouterView></RouterView>
</template>

<script>
// 引入 RouterView
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  }
}
</script>
