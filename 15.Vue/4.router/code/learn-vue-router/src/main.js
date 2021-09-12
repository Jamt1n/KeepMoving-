import Vue from 'vue'
import App from './App.vue'
// eslint-disable-next-line no-unused-vars
import router from './router'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
