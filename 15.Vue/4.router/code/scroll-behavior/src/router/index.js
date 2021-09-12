/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Bar from "../views/Bar.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: Home },
    { path: "/bar", component: Bar },
  ],
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from);
    // console.log(savedPosition);

    // if (savedPosition) {
    //   return savedPosition;
    // }

    // return {
    //   x: 0,
    //   y: 100,
    // };

    if (to.hash) {
      return {
        selector: to.hash,
        offset: {
          y: 100,
        },
        behavior: "smooth",
      };
    }
  },
});

export default router;
