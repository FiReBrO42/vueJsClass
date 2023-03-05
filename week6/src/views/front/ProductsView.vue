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
            class="btn btn-outline-danger"
            @click="addToCart(product.id)"
          >
            加入購物車
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 問卷 -->
  <div class="my-5 row justify-content-center">
    <v-form
      ref="form"
      class="col-md-6"
      v-slot="{ errors }"
      @submit="checkout()"
    >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="required|email"
          v-model="form.user.email"
        ></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field
          id="tel"
          name="電話"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          :rules="isPhone"
          v-model="form.user.tel"
        ></v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-l abel">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </v-form>
  </div>
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
      }
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
          this.products = res.data.products
          console.log('產品列表', res.data.products)
        })
    },
    // 加入購物車API
    addToCart (id) {
      // 建立要帶入的資料
      const data = {
        product_id: id,
        qty: 1
      }
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          console.log(res.data.message)
        })
    },
    checkout () {
      console.log(this.form)
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
