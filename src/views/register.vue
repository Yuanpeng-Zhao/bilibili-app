<template>
  <div>
    <top-bar>
      <template v-slot:middle>注册bilibili</template>
      <template v-slot:right>
        <div @click="$router.push('/login')">登录</div>
      </template>
    </top-bar>

    <login-text
      label="姓名"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      style="margin:4.167vw 0"
      @inputCheck="res=>model.name=res"
    ></login-text>

    <login-text
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputCheck="res=>model.username=res"
    ></login-text>

    <login-text
      label="密码"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputCheck="res=>model.password=res"
    ></login-text>

    <login-btn btnText="注册" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import TopBar from "components/common/TopBar";
import LoginText from "components/content/LoginText";
import LoginBtn from "components/content/LoginBtn";

export default {
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  components: {
    TopBar,
    LoginText,
    LoginBtn,
  },
  methods: {
    async registerSubmit() {
      // console.log(1);
      let rulg = /^.{6,16}$/;
      if (
        rulg.test(this.model.name) &&
        rulg.test(this.model.username) &&
        rulg.test(this.model.password)
      ) {
        // console.log(1);
        const res = await this.$http.post("/register", this.model);
        this.$msg.fail(res.data.msg);
        if (res.data.code == 302) {
          this.$msg.fail(res.data.msg);
        } else {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.objtoken);
          setTimeout(() => {
            this.$router.push("/userinfo");
          }, 1000);
        }
        /*------------------------------ */
      } else {
        this.$msg.fail("格式不正确请重新输入");
      }
    },

    click() {},
  },
};
</script>

<style>
</style>