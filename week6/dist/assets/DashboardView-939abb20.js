import{_ as d,R as h,r as i,o as p,c as _,a as s,w as n,b as e,d as a,h as m,F as f}from"./index-50047dfe.js";const{VITE_APP_URL:k}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"firebro42",BASE_URL:"/vue-hk-week6/",MODE:"production",DEV:!1,PROD:!0},$={components:{RouterView:h},methods:{logout(){document.cookie=`firebro42=; expires=${new Date}`,this.$router.push("/login")},checkApi(){const c=document.cookie.replace(/(?:(?:^|.*;\s*)firebro42\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=c;const o=`${k}/api/user/check`;this.$http.post(o).then(t=>{console.log(t),t.data.success||(alert(t.data.message),this.$router.push("/login"))})}},mounted(){this.checkApi()}},V=a("div",null,"這是!!後台!!頁面",-1),w=a("hr",null,null,-1);function A(c,o,t,P,R,u){const r=i("router-link"),l=i("RouterView");return p(),_(f,null,[s(r,{to:"/admin/products"},{default:n(()=>[e("後台產品頁面")]),_:1}),e(" | "),s(r,{to:"/admin/orders"},{default:n(()=>[e("後台訂單頁面")]),_:1}),e(" | "),s(r,{to:"/"},{default:n(()=>[e("前台")]),_:1}),V,a("a",{href:"#",onClick:o[0]||(o[0]=m(g=>u.logout(),["prevent"]))},"登出"),w,s(l)],64)}const E=d($,[["render",A]]);export{E as default};