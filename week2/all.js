const basicUrl = 'https://vue3-course-api.hexschool.io';
const signinApiUrl = '/v2/admin/signin';
const path = 'firebro';

const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const btnLogin = document.querySelector('.btn')


const { createApp } = Vue;

const app = {
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        siginApi() {
            axios.post(`${basicUrl}${signinApiUrl}`, this.user)
                .then((res) => {
                    //取出 token 與 到期日期的時間戳
                    const { token, expired } = res.data;
                    console.log(token,expired)
                    //建立Cookie,token與有效日期
                    document.cookie = `firenbro42=${token}; expires=${expired};`;
                    //使用axios時，帶入token
                    axios.defaults.headers.common['Authorization'] = token;
                    //轉址
                    window.location = './admin.html';
                })
                .catch((err) => {
                    //警告,API中的錯誤時的提示訊息,
                    alert(err.data.message)
                    console.log(err);
                })
        }
    }
};
createApp(app).mount('#app');


//以下JS
/*//點擊事件監聽
btnLogin.addEventListener('click', (e) => {
    //阻止預設事件
    e.preventDefault();
    //登入signinApi
    /*     JsSiginApi() 
})
function JsSiginApi() {
    //取得input值
    const username = usernameInput.value;
    const password = passwordInput.value;
    //帶入規定的格式
    // 縮寫 username:username(這個變數)
    const user = {
        username,
        password
    };
    //登入signinApi
    axios.post(`${basicUrl}${signinApiUrl}`, user)
        .then(res => {
            //取出 token 與 到期日期的時間戳
            const { token, expired } = res.data;
            //建立Cookie
            document.cookie = `firenbro=${token}; expires=${expired};`;
            //使用axios時，帶入token
            axios.defaults.headers.common['Authorization'] = token;
            //轉址
            window.location = './admin.html';
        })
        .catch(err => {
            //錯誤時警告
            alert('請確認帳號密碼')
            console.log(err)
        })
}
*/