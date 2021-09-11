import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// template -> render
// h -> vnode

// el:"#app"
// $mount()

new Vue({
  render: (h) => h(App),
}).$mount("#app");
