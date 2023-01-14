const {createApp} = Vue;
const app = {
    data(){
        return{
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        sigin(){
            let apiUrl = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
            axios.post(apiUrl,this.user)
            .then(res=>{
                const { token, expired } = res.data;
                //設定axios header全域默認設定
                axios.defaults.headers.common['Authorization'] = token;
                //設定cookie
                document.cookie = `firebro42=${token}; expires=${expired}`;
                alert(res.data.message);
                window.location="./admin.html";
            })
            .catch(err => {
                alert(err.data.message);
                console.log(err);
            })
        }
    }
}
createApp(app).mount('#app');

/*
const username = document.querySelector('#username');
const password = document.querySelector('#password');

let apiUrl = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
//帶入資料

document.querySelector('.btn').addEventListener('click',(e)=>{
    e.preventDefault();
    
    const user = {
        username : username.value,
        password : password.value
    }
    axios.post(apiUrl, user)
    .then(res => {
        const { token, expired } = res.data
        //設定axios header全域默認設定
        axios.defaults.headers.common['Authorization'] = token;
        //設定cookie
        document.cookie = `firebro42=${token}; expires=${expired}`;
        alert(res.data.message)
    })
    .catch(err => {
        alert(err.data.message)
        console.log(err)
    })
})

*/