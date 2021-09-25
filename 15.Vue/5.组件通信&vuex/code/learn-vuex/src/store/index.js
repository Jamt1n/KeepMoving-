import Vuex from "vuex";
import Vue from "vue";

console.log(Vuex);

// 1. 使用插件
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: "xiaohong",
    age: 18,
    users: [
      {
        name: "xiaohong",
        age: 18,
      },

      {
        name: "xiaoli",
        age: 19,
      },
    ],
  },

  mutations: {
    changeUsername(state, { username }) {
      console.log("change user name");

      //   setTimeout(() => {
      //     state.username = username;
      //   }, 5000);
      state.username = username;
    },

    changeUserAge(state, { age }) {
      //   setTimeout(() => {
      //     state.age = age;
      //   }, 2000);
      state.age = age;
    },
  },

  actions: {
    async changeUsername({ commit }, payload) {
      console.log(commit);
      console.log(payload);

      setTimeout(() => {
        commit("changeUsername", payload);
      }, 2000);

      // await fetch api
      // await xx
    },
  },

  // 全局的计算属性
  getters: {
    tenYeasOld(state) {
      return state.age + 10;
    },
    findUsersByAge(state) {
      // age
      // 不可以缓存了
      return (age) => {
        return state.users.filter((user) => {
          return user.age === age;
        });
      };
    },
  },
});
console.log(store);

export default store;
