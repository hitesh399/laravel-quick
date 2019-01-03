import Vue from 'vue'
import App from './App.vue'
import store from './store';
import LQForm from './components/LQ-Form';
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.component('lq-form', LQForm)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')