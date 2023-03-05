<template>
  <div>單一產品</div>
  <h2>{{ product.title }}</h2>
  <img :src="product.imageUrl"  class="img-fluid" alt="">
  <p>價格:{{ product.price }}元</p>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      console.log(this.$route.params)
      // 解構式 const id = this.$route.params.id
      const { id } = this.$route.params
      // 特定產品api
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
          console.log('單一產品', res.data.product)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
