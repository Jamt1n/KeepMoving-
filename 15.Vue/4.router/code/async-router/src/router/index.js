import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/foo",
    name: "Foo",
    component: () => import(/* webpackChunkName: 'user' */ "../views/Foo.vue"),
  },
  {
    path: "/bar",
    name: "Bar",
    component: () => import(/* webpackChunkName: 'user' */ "../views/Bar.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
