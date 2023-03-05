import{_ as P,e as V,r as l,o as r,c as i,d as e,F as m,f as y,a,w as u,t as E,b as k,n as T}from"./index-755c0eb7.js";const{VITE_APP_URL:_,VITE_APP_PATH:p}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"firebro42",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},$={data(){return{products:[],form:{user:{name:"",email:"",tel:"",address:""},message:""}}},components:{RouterLink:V},methods:{getProducts(){this.$http.get(`${_}/v2/api/${p}/products/all`).then(s=>{this.products=s.data.products,console.log("產品列表",s.data.products)})},addToCart(s){const o={product_id:s,qty:1};this.$http.post(`${_}/v2/api/${p}/cart`,{data:o}).then(d=>{console.log(d.data.message)})}},mounted(){this.getProducts()}},x=e("div",null,"產品列表",-1),A=e("hr",null,null,-1),C={class:"table align-middle"},w=["src"],L=["onClick"],R={class:"my-5 row justify-content-center"},U={class:"mb-3"},B=e("label",{for:"email",class:"form-label"},"Email",-1),D=e("div",{class:"text-end"},[e("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function I(s,o,d,N,n,f){const h=l("router-link"),b=l("v-field"),g=l("error-message"),v=l("v-form");return r(),i(m,null,[x,A,e("table",C,[e("tbody",null,[(r(!0),i(m,null,y(n.products,t=>(r(),i("tr",{class:"",key:t.id},[e("td",null,E(t.title),1),e("td",null,[e("img",{class:"img-fluid",src:t.imageUrl,width:"200",alt:""},null,8,w)]),e("td",null,[a(h,{to:`product/${t.id}`,class:"btn btn-outline-secondary"},{default:u(()=>[k("查看產品內容")]),_:2},1032,["to"]),e("button",{type:"button",class:"btn btn-outline-danger",onClick:c=>f.addToCart(t.id)}," 加入購物車 ",8,L)])]))),128))])]),e("div",R,[a(v,{ref:"form",class:"col-md-6"},{default:u(({errors:t})=>[e("div",U,[B,a(b,{id:"email",name:"email",type:"email",class:T(["form-control",{"is-invalid":t.email}]),placeholder:"請輸入 Email",rules:"required|email",modelValue:n.form.user.email,"onUpdate:modelValue":o[0]||(o[0]=c=>n.form.user.email=c)},null,8,["class","modelValue"]),a(g,{name:"email",class:"invalid-feedback"})]),D]),_:1},512)])],64)}const F=P($,[["render",I]]);export{F as default};