/* import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' */

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});



const apiUrl = 'https://vue3-course-api.hexschool.io/';
const apiPath = 'firebro42';
/* v2/api/{api_path}/product/{id} */

const productModal = {
  //當ID變動時，取得遠端資料，並呈現 Modal
  props: ['id', 'addToCart', 'openModal'],
  data() {
    return {
      modal: {},
      temProduct: {},
      qty: 1,
    }
  },
  template: '#userProductModal',
  watch: {
    id() {
      if (this.id) {
        //console.log('productId', this.id);
        axios.get(`${apiUrl}v2/api/${apiPath}/product/${this.id}`)
          .then((res) => {
            this.temProduct = res.data.product;
            //取完資料後顯示 Modal
            this.qty = 0;
            this.modal.show();
          })
      }
    }
  },
  methods: {
    hide() {
      this.modal.hide();
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
    this.$refs.modal.addEventListener('hidden.bs.modal', (event) => {
      console.log('Modal關閉了');
      this.openModal('');
    })
  },
}

Vue.createApp({
  data() {
    return {
      productId: '',
      products: [],
      cart: [],
      loadingItem: '',
      form: {
        user: {
          name: "test",
          email: "test@gmail.com",
          tel: "0912346768",
          address: "kaohsiung"
        },
        message: "這是留言"
      }
    }
  },

  components: {
    productModal,
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },

  methods: {
    getProducts() {
      axios.get(`${apiUrl}v2/api/${apiPath}/products/all`)
        .then((res) => {
          this.products = res.data.products;
          //console.log("產品列表:", res);
        })
    },
    openModal(id) {
      this.productId = id;
      //console.log('外層帶入的ID', id);

    },
    getCarts() {
      axios.get(`${apiUrl}v2/api/${apiPath}/cart`)
        .then((res) => {
          this.cart = res.data.data;
          //console.log('購物車', res.data.data);
        })
    },
    //API新增購物車,帶入規定資料格式
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty
      };
      axios.post(`${apiUrl}v2/api/${apiPath}/cart`, { data })
        .then((res) => {
          //console.log('加入購物車', res.data);
          this.$refs.productModal.hide();
          this.getCarts();
        })
    },
    //新增API
    updateCartItem(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      }
      //用於暫停輸入 disabled input
      this.loadingItem = item.id;

      axios.put(`${apiUrl}v2/api/${apiPath}/cart/${item.id}`, { data })
        .then((res) => {
          //console.log('調整購物車', res.data.data);
          this.getCarts();
          this.loadingItem = '';//清空重設
        })
    },
    //刪除購物車特定選項API
    deleteCart(item) {
      this.loadingItem = item.id;
      axios.delete(`${apiUrl}v2/api/${apiPath}/cart/${item.id}`)
        .then((res) => {
          //console.log('刪除購物車', res.data);
          this.getCarts();
          this.loadingItem = '';//清空重設
        })
    },
    //刪除整個購物車API
    deleteAllCart() {
      axios.delete(`${apiUrl}v2/api/${apiPath}/carts`)
        .then((res) => {
          console.log('刪除全部購物車', res.data);
          this.getCarts();
        })
    },
    //結帳API
    checkout() {
      const data = this.form;
      axios.post(`${apiUrl}v2/api/${apiPath}/order`, { data })
        .then((res) => {
          console.log('結帳', res.data);
        })
    }
  },

  mounted() {
    this.getProducts();
    this.getCarts();

  },
})
.mount('#app')