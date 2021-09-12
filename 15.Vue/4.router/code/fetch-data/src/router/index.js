import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Foo from "../components/Foo.vue";
import Bar from "../components/Bar.vue";

Vue.use(VueRouter);
// 在 router 中如何 fetch 后端的 data
// 1. 导航完成后来获取数据
// 2. 导航完成前来获取数据

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/bar/:id",
    name: "Bar",
    component: Bar,
  },
  {
    path: "/foo/:id",
    name: "Foo",
    component: Foo,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
