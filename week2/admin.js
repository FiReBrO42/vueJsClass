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
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'firebro42',
      //建立空物件
      tempProducts : {},
      //products帶入已宣告陣列資料 縮寫法 -> products:products
      products,
    }
  },
  methods:{
    getProducts(){
      //取得資料productsApi
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
      .then((res)=>{
        //data的products
        this.products=res.data.products
      })
    },
    checkFn() {
      //驗證checkApi
      axios.post(`${this.apiUrl}/api/user/check`)
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
    //let 定義變數名 = document.cookie.replace(/(?:(?:^|.*;\s*)命名的cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let token = document.cookie.replace(/(?:(?:^|.*;\s*)firenbro42\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    //當每次執行時，自動帶入token
    axios.defaults.headers.common['Authorization'] = token;//cookie有儲存時
    this.checkFn();
    this.getProducts();
  }
}
//安裝 createApp(生成的應用宣告名字).mount('DOM選取')
createApp(app).mount('#app');
