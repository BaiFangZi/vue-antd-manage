import Vue from 'vue'
import Router from 'vue-router'
// console.log(syncRoutes)
Vue.use(Router)

export default new Router({
  mode: 'history',
  // ...syncRoutes
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login'),
      meta: {
        title: '登陆',
        icon: '',
        auth: ['admin', 'normal'],
        // isHidden: true,
      },
    },
  ],
})
