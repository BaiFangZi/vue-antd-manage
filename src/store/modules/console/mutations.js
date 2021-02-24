import state from './state'
import Router from '@/router'
import AsyncRoutes from '@/router/routes/asyncRoutes'
import SyncRoutes from '@/router/routes/syncRoutes'

import {
    findIndex
} from 'lodash'

export default {

    GENERATE_ROUTER() {
        const containerIndex = findIndex(SyncRoutes, {
            path: '/layout'
        })
        const Layout = SyncRoutes[containerIndex]
        Layout.children.push(...AsyncRoutes)
        state.menus= AsyncRoutes

        Router.$addRoute(SyncRoutes)

        // console.log(Router.options)
    }
}