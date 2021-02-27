import state from './state'
import router from '@/router'
import asyncRoutes from '@/router/routes/asyncRoutes'
import constantRoutes from '@/router/routes/constantRoutes'

import { findIndex, remove } from 'lodash'
// import router from '../../../router'

export default {
  GENERATE_ROUTER() {
    const layout = constantRoutes.find((v) => v.path === '/')
    console.log(layout)
    layout.children = state.menuList = asyncRoutes
    console.log(layout.children)

    // router.addRoute(syncRoutes)

    constantRoutes.forEach((r) => router.addRoute(r))

    // console.log(router)
  },
}
