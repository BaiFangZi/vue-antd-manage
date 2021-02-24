export default [{
        path: '',
        redirect: '/dashboard',
        component: () => import('@/layout'),
        meta: {
            key: '/',
            title: '根路由',
            icon: '',
            auth: '',
            isHidden: true,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login'),
        meta: {
            key: 'login',
            title: '登陆',
            icon: '',
            auth: '',
            isHidden: true,
        }
    },
    {
        path: '/404NotFound',
        name: 'NotFound',
        component: () => import('@/views/404NotFound'),
        meta: {
            key: '404',
            title: 'NotFound',
            icon: '',
            auth: '',
            isHidden: true,
        }

    },
    {
        path: '/layout',
        name: 'Layout',
        component: () => import('@/layout'),
        meta: {
            name: 'layout',
            title: '布局',
            icon: '',
            auth: '',
            isHidden: true,
        },
        redirect: '/dashboard',
        children: [{
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard'),
            meta: {
                name: 'dashboard',
                title: '主页',
                icon: '',
                auth: '',
                isHidden: true,
            }
        }]


    },
    {
        path: '*',
        name: '*',
        redirect: '/404NotFound'
    }

]