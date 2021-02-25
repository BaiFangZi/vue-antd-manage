import state from './state'
import Router from '@/router'
import AsyncRoutes from '@/router/routes/asyncRoutes'
import SyncRoutes from '@/router/routes/syncRoutes'

import { findIndex, remove } from 'lodash'

export default {
  GENERATE_ROUTER() {
    const containerIndex = findIndex(SyncRoutes, {
      path: '/layout',
    })
    const Layout = SyncRoutes[containerIndex]
    remove(Layout.children, (r) => r.path !== '/dashboard') //还原children数组，防止重复push
    Layout.children.push(...AsyncRoutes)
    // state.menus= AsyncRoutes

    Router.$addRoute(SyncRoutes)

    // console.log(Router.options)
  },
}
