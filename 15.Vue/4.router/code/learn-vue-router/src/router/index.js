/* eslint-disable no-unused-vars */
import VueRouter from "vue-router";
import Vue from "vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Details from "../views/Details.vue";
import Bar from "../views/Bar.vue";
import Foo from "../views/Foo.vue";
// import Zhangesan from "../views/Zhangesan.vue";

console.log(VueRouter);

// use -> koa
// koa.use() -> 添加
// 插件
// Vue.component("RouterView",RouterView)
// Vue.component("RouterLink",RouterLink)
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      beforeEnter(to, from, next) {
        console.log("before-enter");
        next();
      },
      children: [
        {
          // 绝对路径
          alias: ["new-foo", "one-foo", "two-foo"],
          path: "foo",
          component: Foo,
        },
        // {
        //   // path: "new-foo",
        //   // /new-foo -> /foo
        //   // 相对路径
        //   // redirect: "foo",
        //   // alias: "foo",
        //   // redirect(to) {
        //   //   console.log(to);
        //   //   return to.query.to;
        //   //   // return "foo"
        //   // },
        // },
      ],
    },
    // {
    //   path: "/jia",
    //   // / -> 绝对路径
    //   redirect: "/home",
    // },
    // {
    //   // 相对路径
    //   // jia
    //   alias: "/jia",
    //   path: "/home",
    //   // /home -> component (Home)
    //   // /home -> {}
    //   // component: Home,
    //   components: {
    //     default: Home,
    //     one: Foo,
    //     two: Bar,
    //   },
    // },
    // 谁先配置的 ，谁的优先级就高
    // {
    //   path: "/user/zhangsan",
    //   component: Zhangesan,
    // },
    {
      path: "/new-user/:id",
      redirect: "/user/:id",
    },
    {
      name: "User",
      path: "/users/:id",
      component: User,
      children: [
        {
          // /user/:id/foo
          path: "foo",
          component: Foo,
        },
        {
          path: "bar",
          component: Bar,
        },
      ],
    },
    {
      path: "/details/:id",
      component: Details,
      props(route) {
        console.log(route);
        return {
          id: route.params.id + "/ldlfdjf",
        };
      },
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

router.beforeEach((to, from, next) => {
  // console.log("to", to);
  // console.log("from", from);
  // console.log(next);
  // // next -> koa
  console.log("before-each");
  next();
});

router.afterEach(() => {
  console.log("after-each");
});

export default router;
