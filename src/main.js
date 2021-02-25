import Vue from 'vue'
import App from './App.vue'
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
import './assets/global.css'
import './mock'
import { replace } from 'lodash'
Vue.config.productionTip = false

Vue.use(AntD)
const whiteRoutes = ['/login'] //路由白名单
const hasToken = localStorage.getItem('access-token')
console.log(hasToken)
// router.beforeEach((to, from, next) => {
//   //白名单路由可以直接跳转
//   if (whiteRoutes.includes(to.path)) {
//     next()
//   } else {
//     //其他路由需要token
//     if (hasToken) {
//       //如果有token允许跳转
//       store.commit('console/GENERATE_ROUTER')
//       console.log(router)
//       next()
//       // next('/page1')
//       next({
//         // path: to.path,
//         // ...to,
//         // replace: true,
//       })
//     } else {
//       //没有token就跳转到登陆页
//       next('/login')
//     }
//   }
//   next()
// })

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
