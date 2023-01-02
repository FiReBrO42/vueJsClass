
const basicUrl = 'https://vue3-course-api.hexschool.io';
const checkApi = '/v2/api/user/check';
const productsApi = '/v2/api/firebro42/admin/products';

const path = 'firebro';
// 產品資料格式
//定義資料
const products = [];

//VUE.JS
//建立元件
const { createApp } = Vue;
//生成
const app = {
  data() {
    return {
      //建立空物件
      tempProducts : {},
      //products帶入已宣告陣列資料 縮寫法 -> products:products
      products,
    }
  },
  methods:{
    getProducts(){
      //取得資料productsApi
      axios.get(`${basicUrl}${productsApi}`)
      .then((res)=>{
        //data的products
        this.products=res.data.products
      })
    },
    checkFn() {
      //驗證checkApi
      axios.post(`${basicUrl}${checkApi}`)
        .then(res => {
          alert('確認使用者已登入')
        })
        .catch(err => {
          console.log(err);
          //警告提示
          alert('使用者未登入')
          //轉址回登入頁面
          window.location = './index.html';
        })
    },
  },
  mounted(){
    let token = document.cookie.replace(/(?:(?:^|.*;\s*)firenbro42\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    //當每次執行時，自動帶入token
    axios.defaults.headers.common['Authorization'] = token;//cookie有儲存時
    this.checkFn();
    this.getProducts();
  }
}
//安裝 createApp(生成的應用宣告名字).mount('DOM選取')
createApp(app).mount('#app');
