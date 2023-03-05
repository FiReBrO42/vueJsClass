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
        <tr  v-for="item in cart.carts" :key="item.id">
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
          name: 'test',
          email: 'test@gmail.com',
          tel: '0912346768',
          address: 'kaohsiung'
        },
        message: '這是留言'
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
        .put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
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
    }
  },

  mounted () {
    this.getProducts()
    this.getCarts()
  }
}
</script>
