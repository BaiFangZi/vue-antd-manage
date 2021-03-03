import Vue from 'vue'
import App from './App.vue'
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import router from './router'
import store from './store'
import './assets/global.css'
import directives from './directives'
import './mock'

import TableOperations from './components/TableOperations'

//遍历添加权限
Object.keys(directives).forEach((key) => Vue.directive(key, directives[key]))

//遍历添加全局组件
Vue.component('table-operations', TableOperations)

Vue.config.productionTip = false

Vue.use(AntD)
// Vue.use(Echarts)
import * as Echarts from 'echarts' //echarts5.0
Vue.prototype.$echarts = Echarts

const whiteRoutes = ['/login'] //路由白名单

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access-token')

  if (token) {
    //如果有token
    if (to.path === '/login') {
      //想跳转找到login页面
      next() //允许跳转
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
      } else {
        next()
      }
    }
  } else {
    //如果没有token
    // console.log('no token')
    if (whiteRoutes.indexOf(to.path) !== -1) {
      //设置login白名单，防止login无token时陷入死循环
      console.log(to.path)
      next()
    } else {
      //如果不是login，跳到login登陆去获取token
      next('/login')
    }
  }
})

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
