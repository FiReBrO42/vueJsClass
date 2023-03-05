<template>
  <div>購物車</div>

  <!-- 購物車列表 -->
  <div class="text-end">
    <button
      class="btn btn-outline-danger"
      type="button"
      @click="deleteAllCart()"
    >
      清空購物車
    </button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              :disabled="item.id === loadingItem"
              @click="deleteCart(item)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              x
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <!--                   <div class="text-success" v-if="item.product.is_enabled">
                    已套用優惠券
                  </div> -->
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  min="1"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  v-model="item.qty"
                  :disabled="item.id === loadingItem"
                  @change="updateCartItem(item)"
                />
                <!--                       <select name="" id="" class="form-select" v-model="item.qty">
                        <option :value="i" v-for="i in 500" :key="`${i}1234`">
                          {{i}}
                        </option>
                      </select> -->
                <span class="input-group-text" id="basic-addon2">{{
                  item.product.unit
                }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            {{ item.total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
  <!-- 問卷 -->
  <div class="my-5 row justify-content-center">
    <v-form
      ref="form"
      class="col-md-6"
      v-slot="{ errors }"
      @submit.prevent="checkout ()"
    >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{
            'is-invalid': errors['email'],
            'is-valid': !errors['email'] && form.user.email
          }"
          placeholder="請輸入 Email"
          rules="email|required"
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
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      productId: '',
      products: [],
      cart: [],
      loadingItem: '',
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

  methods: {
    getProducts () {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
          // console.log("產品列表:", res);
        })
    },
    openModal (id) {
      this.productId = id
      // console.log('外層帶入的ID', id);
    },
    getCarts () {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
          // console.log('購物車', res.data.data);
        })
    },
    // 新增API
    updateCartItem (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      // 用於暫停輸入 disabled input
      this.loadingItem = item.id

      this.$http
        .put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, {
          data
        })
        .then((res) => {
          // console.log('調整購物車', res.data.data);
          this.getCarts()
          this.loadingItem = '' // 清空重設
        })
    },
    // 刪除購物車特定選項API
    deleteCart (item) {
      this.loadingItem = item.id
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          // console.log('刪除購物車', res.data);
          this.getCarts()
          this.loadingItem = '' // 清空重設
        })
    },
    // 刪除整個購物車API
    deleteAllCart () {
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          console.log('刪除全部購物車', res.data)
          this.getCarts()
        })
    },
    // 結帳API
    checkout () {
      const data = this.form
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/order`, { data })
        .then((res) => {
          console.log('結帳', res.data)
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  },

  mounted () {
    this.getProducts()
    this.getCarts()
  }
}
</script>
