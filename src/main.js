import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/global.css'
import './mock'

import TableOperations from './components/TableOperations'
//遍历添加全局组件
Vue.component('table-operations', TableOperations)

//遍历添加权限
import directives from './directives'
Object.keys(directives).forEach((key) => Vue.directive(key, directives[key]))

Vue.config.productionTip = false

import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(AntD)

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) // 去除圆形加载状态图标

import * as Echarts from 'echarts' //echarts5.0
Vue.prototype.$echarts = Echarts

import i18n from './lang'
// console.log(i18n)
// const i18n = new VueI18n({
//   local: '',
//   message,
// })

//路由权限
const whiteRoutes = ['/login'] //路由白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = localStorage.getItem('access-token')

  if (token) {
    //如果有token
    if (to.path === '/login') {
      //想跳转找到login页面
      next() //允许跳转

      NProgress.done()
    } else {
      //想跳转到其他页面

      const menuList = store.state.console.menuList
      if (!menuList.length) {
        // const auth = JWT.decode(token)
        // console.log(auth)
        store.commit('console/GENERATE_ROUTER', token)
        next({
          ...to,
          replace: true,
        })

        NProgress.done()
      } else {
        next()

        NProgress.done()
      }
    }
  } else {
    //如果没有token
    // console.log('no token')
    if (whiteRoutes.indexOf(to.path) !== -1) {
      //设置login白名单，防止login无token时陷入死循环
      console.log(to.path)
      next()

      NProgress.done()
    } else {
      //如果不是login，跳到login登陆去获取token
      next('/login')

      NProgress.done()
    }
  }
})
router.afterEach((to, from) => {
  // console.log(from)
  store.commit('routerTags/SET_ROUTER_TAGS', to)
})

new Vue({
  render: (h) => h(App),
  router,
  store,
  i18n,
}).$mount('#app')
