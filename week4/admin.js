import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from './pagination.js'

const site = 'https://vue3-course-api.hexschool.io/v2';
let apiPath = 'firebro42';

let productModal = {};
let delProductModal = {};

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: false,
            page:{},
        }
    },
    methods: {
        //檢查驗證API
        checkApi() {
            const api = `${site}/api/user/check`
            axios.post(api)
                .then(res => {
                    alert("登入成功");
                    this.getProduct()
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location = './index.html'
                })
        },
        //取得產品API
        getProducts(page=1) { //預設參數
            const url = `${site}/api/${apiPath}/admin/products/?page=${page }`
            axios.get(url)
                .then((res) => {
                    this.products = res.data.products;
                    this.page = res.data.pagination;
                })
                .catch((err) => {
                    alert(err.data.message)
                })

        },
        //bootstrap modal
        openModal(status, product) {
            if (status === 'new') {
                productModal.show();
                this.isNew = true;
                this.tempProduct = {
                    imagesUrl: []
                }
            }
            else if (status === 'edit') {
                productModal.show();
                this.isNew = false;
                this.tempProduct = { ...product };
            }
            else if (status === 'del') {
                delProductModal.show();
                this.tempProduct = { ...product };
            }
        },
        //新增 編輯 資料API
        updataProduct() {
            let url = `${site}/api/${apiPath}/admin/product`;
            let method = `post`;
//判定isnew 來選擇是否變更為編輯 axios
            if (!this.isNew) {
                url = `${site}/api/${apiPath}/admin/product/${this.tempProduct.id}`
                method = 'put';
            }

            axios[method](url, { data: this.tempProduct })
                .then(() => {
                    this.getProducts();
                    alert("成功");
                    productModal.hide();
                })
                .catch((err) => {
                    alert(err.data.message)
                })
        },
        //刪除指定商品 API
        deleteProduct() {
            let url = `${site}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
                .then((res) => {
                    alert('刪除成功')
                    this.getProducts();
                    delProductModal.hide();
                })
                .catch((err) => {
                alert(err.data.message)
                })
        }
    },
    mounted() {
        //取出cookie的token ，正則中間是COOKIE名稱
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)firebro42\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //設定axios header全域默認設定，
        axios.defaults.headers.common['Authorization'] = token;

        /*         this.checkApi(); */
        /*         this.checkApi(); */
        this.getProducts()
        //bootstrap modal JS 使用方法
        productModal = new bootstrap.Modal('#productModal');
        delProductModal = new bootstrap.Modal('#delProductModal');
    },
    components:{
        pagination
    }
})

//app.component元件('自訂義名稱',{物件})
//新增元件 
app.component('product-modal',{
    //外部傳內部資料
    props:['tempProduct','updataProduct'],
    //取得html的 x-template
    template:'#product-modal-template'
})
//刪除元件
app.component('delete-modal',{
    props:['tempProduct','deleteProduct'],
    template:'#delete-modal-template'
})
app.mount('#app')   
