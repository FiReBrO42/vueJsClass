<template>
    <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link>
  <div>這是前台頁面</div>
  <hr>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  }
}
</script>
