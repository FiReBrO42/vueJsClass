const { createApp } = Vue;
const app = {
    data() {
        return {
            products: [],
            template: {
                title: "",
                category: "",
                origin_price: '',
                price: '',
                unit: '',
                description: "",
                content: "",
                is_enabled: 0,
                imageUrl: "",
                imagesUrl: [
                    ''
                ]
            },
            deleteId: ""
        }
    },
    methods: {
        //檢查
        checkApi() {
            const api = "https://vue3-course-api.hexschool.io/v2/api/user/check"
            axios.post(api)
                .then(res => {
                    alert("登入成功");
                    this.getProduct();
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location = './index.html'
                })
        },
        //取得資料
        getProduct() {
            let apiUrl = 'https://vue3-course-api.hexschool.io/v2/api/firebro42/admin/products'
            axios.get(apiUrl)
                .then(res => {
                    this.products = res.data.products
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        },
        //新增圖片
        addImage() {
            let inputValue = document.querySelector('#inputImageUrl').value;
            this.template.imageUrl = inputValue;
            this.template.imagesUrl.push(inputValue);
        },
        //刪除圖片
        deleteImage() {
            this.template.imageUrl = "";
        },
        //建立新的產品
        addProduct() {
            let newProduct = {
                data: {
                    ...this.template
                }
            }
            if (!this.template.id) {
                let apiUrl = "https://vue3-course-api.hexschool.io/v2/api/firebro42/admin/product"
                axios.post(apiUrl, newProduct)
                    .then(res => {
                        console.log(this.products);
                        alert(res.data.message)
                        this.getProduct();
                    })
                    .catch(err => {
                        alert(err.data.message)
                    })
            } else {
                this.products.forEach((item, index) => {
                    if (item.id === this.template.id) {
                        let apiUrl = "https://vue3-course-api.hexschool.io/v2/api/firebro42/admin/product/"
                        let id = item.id
                        axios.put(`${apiUrl}${id}`, newProduct)
                            .then(res => {
                                alert(res.data.message)
                                this.getProduct();
                            })
                            .catch(err => {
                                alert(err.data.message)
                            })
                    }
                })
                this.template = {};
            }
        },
        //編輯
        editProduct(item1) {
            this.template = { ...item1 };
        }
        ,
        //刪除
        //產生刪除ID
        deleteProductId(item) {
            this.deleteId = item.id.trim();
        },
        deleteProduct() {
            let apiUrl = "https://vue3-course-api.hexschool.io/v2/api/firebro42/admin/product/"
            let id = this.deleteId;
            console.log(apiUrl, id);
            axios.delete(`${apiUrl}${id}`)
                .then(res => {
                    alert(res.data.message)
                    this.getProduct();
                })
                .catch(err => {
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
        this.checkApi();
        console.log(token)
    }
}
createApp(app).mount('#app')
