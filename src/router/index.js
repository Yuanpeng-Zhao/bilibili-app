import Vue from "vue";
import VueRouter from "vue-router";
import home from "views/home";

const register = () => import("views/register");
const login = () => import("views/login");
const userInfo = () => import("views/userinfo");
const edit = () => import("views/edit");
const detail = () => import("views/detail");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    meta:{
      keepalive:true
    }
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/userinfo",
    name: "userinfo",
    component: userInfo,
    meta: {
      istoken: true,
    },
  },
  {
    path: "/edit",
    name: "edit",
    component: edit,
    meta: {
      istoken: true,
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: detail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    (!localStorage.getItem("id") || !localStorage.getItem("token")) &&
    to.meta.istoken == true
  ) {
    router.push("/login");
    Vue.prototype.$msg.fail("请重新登录一次");
    return;
  }
  next();
});

export default router;
