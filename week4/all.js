import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';

const app = {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        sigin() {
            let url = `${site}admin/signin`
            axios.post(url, this.user)
                .then((res) => {
                    //解構式縮寫
                    const { token, expired } = res.data;
                    //設定cookie
                    document.cookie = `firebro42=${token}; expires=${ new Date(expired)}`;
                    alert(res.data.message);
                    window.location = "./admin.html";
                })
                .catch((err) => {
                    console.log();
                    console.log(err);
                })
        }
    }
}
createApp(app).mount('#app');