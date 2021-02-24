import syncRoutes from './routes/syncRoutes'
import Vue from 'vue'
import Router from 'vue-router'
// console.log(syncRoutes)
Vue.use(Router)

const createRouter = () => new Router({
    mode: 'history',
    // ...syncRoutes
    routes: [...syncRoutes]
})
const router = createRouter()


router.$addRoute = (routes) => {
    // 创建一个新的空路由对象，避免重复添加路由
    const newRouter = new Router({
        mode: 'history'
    })
    newRouter.addRoute(...routes)

}

export default router