import Vue from 'vue'
import App from './App.vue'
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'
import './assets/global.css'
import './mock'
Vue.config.productionTip = false


Vue.use(AntD)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')