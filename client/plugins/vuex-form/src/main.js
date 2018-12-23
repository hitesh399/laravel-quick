import Vue from 'vue'
import App from './App.vue'
import store from './store';
import LQForm from './components/LQ-Form';

Vue.config.productionTip = false
Vue.component('lq-form', LQForm)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')