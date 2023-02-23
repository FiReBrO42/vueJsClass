/* import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' */

//匯入 productModal元件
import userProductModal from './userProductModal.js';

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
  //validateOnInput: false, //調整為：點外邊時，才進行驗證
});
//規則帶入
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

const apiUrl = 'https://vue3-course-api.hexschool.io/';
const apiPath = 'firebro42';


//productModal元件
/* const productModal = {
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
} */

Vue.createApp({
  data() {
    return {
      productId: '',
      products: [],
      cart: [],
      loadingItem: '',
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    }
  },

/*   components: {
    productModal,
  }, */

  methods: {
    getProducts() {
      axios.get(`${apiUrl}v2/api/${apiPath}/products/all`)
        .then((res) => {
          this.products = res.data.products;
          //console.log("產品列表:", res);
          this.showLoading();
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
          this.showLoading();
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
          alert(res.data.message);
          this.$refs.productModal.hide();
          this.getCarts();
        })
        .catch((err) => {
          alert(err.data.message);
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
          alert(res.data.message);
          this.getCarts();
          this.loadingItem = '';//清空重設
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    //刪除購物車特定選項API
    deleteCart(item) {
      this.loadingItem = item.id;
      axios.delete(`${apiUrl}v2/api/${apiPath}/cart/${item.id}`)
        .then((res) => {
          //console.log('刪除購物車', res.data);
          alert(res.data.message);
          this.getCarts();
          this.loadingItem = '';//清空重設
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    //刪除整個購物車API
    deleteAllCart() {
      axios.delete(`${apiUrl}v2/api/${apiPath}/carts`)
        .then((res) => {
          //console.log('刪除全部購物車', res.data);
          alert(res.data.message);
          this.getCarts();
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    //結帳API
    checkout() {
      const data = this.form;
      axios.post(`${apiUrl}v2/api/${apiPath}/order`, { data })
        .then((res) => {
          //console.log('結帳', res.data);
          alert(res.data.message);
          this.getCarts();
          window.location = './index.html'
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    //規則
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    //VueLoading
    showLoading() {
      let loader = this.$loading.show({
        color: '#999',
        width: 64,
        height: 64
      });
      setTimeout(() => {        // setTimeout設定關閉時間
        loader.hide();
      }, 1000)
    }
  },

  mounted() {
    this.getProducts();
    this.getCarts();
  },
})
  //使用productModal元件
  .component('productModal', userProductModal)
  
  //全域註冊
  .component('VForm', VeeValidate.Form)
  .component('VField', VeeValidate.Field)
  .component('ErrorMessage', VeeValidate.ErrorMessage)

  //元件註冊 可查看 VueLoading的屬性 console.log
  .component('loading', VueLoading.Component)
  //插件使用
  .use(VueLoading.LoadingPlugin)

  .mount('#app')