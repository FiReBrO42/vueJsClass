<template>
  <div>產品列表</div>
  <hr />
  <table class="table align-middle">
    <tbody>
      <tr class="" v-for="product in products" :key="product.id">
        <td>{{ product.title }}</td>
        <td>
          <img class="img-fluid" :src="product.imageUrl" width="200" alt="" />
        </td>
        <td>
          <router-link
            :to="`product/${product.id}`"
            class="btn btn-outline-secondary"
            >查看產品內容</router-link
          >
          <button
            type="button"
            class="btn"
            :class="{
              'btn-outline-primary': loadingItem,
              'btn-outline-danger': !loadingItem
            }"
            :disabled="loadingItem"
            @click="addToCart(product.id)"
          >
            加入購物車
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { RouterLink } from 'vue-router'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      loadingItem: false
    }
  },
  components: {
    RouterLink
  },
  methods: {
    // 取得產品API
    getProducts () {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.$showLoading()
          this.products = res.data.products
          // console.log('產品列表', res.data.products)
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    // 加入購物車API
    addToCart (id) {
      this.loadingItem = true
      // 建立要帶入的資料
      const data = {
        product_id: id,
        qty: 1
      }
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          // console.log(res.data.message)
          alert(res.data.message)
          this.loadingItem = false
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
