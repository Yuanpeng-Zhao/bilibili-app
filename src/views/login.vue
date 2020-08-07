<template>
  <div>
    <top-bar>
      <template v-slot:middle>登录bilibili</template>
      <template v-slot:right ><div @click="$router.push('/register')">注册账号</div></template>
    </top-bar>

    <login-text 
    label="账号" 
    placeholder="请输入账号"
    rule="^.{6,16}$"
    @inputCheck="res=>model.username=res"
    style="margin:4.167vw 0"
    ></login-text>

    <login-text 
    label="密码" 
    placeholder="请输入密码" 
    type="password"
    rule="^.{6,16}$"
    @inputCheck="res=>model.password=res"
    style="margin:4.167vw 0"
    ></login-text>

    <login-btn btnText="登录" @registerSubmit="registerSubmit"></login-btn>
    
  </div>
</template>

<script>

import TopBar from 'components/common/TopBar'
import LoginText from 'components/content/LoginText'
import LoginBtn from 'components/content/LoginBtn'

export default {
  data(){
    return{
      model:{
        username:'',
        password:''
      }
    };
  },
  components: {
    TopBar,
    LoginText,
    LoginBtn
  },
  methods: {
    async registerSubmit(){
      // console.log(1);
      let rulg=/^.{6,16}$/
      if(rulg.test(this.model.username)&&rulg.test(this.model.password)){
        // console.log(1);
        const res= await this.$http.post('/login',this.model)
        this.$msg.fail(res.data.msg)
        if(res.data.code==301||res.data.code==302){
          return
        }
        
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('id',res.data.id)
        setTimeout(()=>{
          this.$router.push('/userinfo')
        },500)
        /*------------------------------ */
      }else{
        this.$msg.fail('格式不正确请重新输入')
      }
    }
  },
}
</script>

<style>

</style>
