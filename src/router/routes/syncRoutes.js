export default [
  {
    path: '',
    redirect: '/dashboard',
    component: () => import('@/layout'),
    meta: {
      title: '根路由',
      icon: '',
      auth: ['admin', 'normal'],
      isHidden: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: '登陆',
      icon: '',
      auth: ['admin', 'normal'],
      isHidden: true,
    },
  },
  {
    path: '/404NotFound',
    name: 'NotFound',
    component: () => import('@/views/404NotFound'),
    meta: {
      title: 'NotFound',
      icon: '',
      auth: ['admin', 'normal'],
      isHidden: true,
    },
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/layout'),
    meta: {
      title: '布局',
      icon: '',
      auth: ['admin', 'normal'],
      isHidden: true,
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          title: '主页',
          icon: '',
          auth: ['admin', 'normal'],
          isHidden: true,
        },
      },
      /****************组件案例路由********************************** */
      {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/demo/table'),
        meta: {
          title: '表格',
          icon: '',
          auth: ['admin', 'normal'],
          isHidden: true,
        },
      },
      {
        path: '/page1',
        name: 'Page1',
        component: () => import('@/views/demo/page/page1'),
        meta: {
          title: 'page1',
          icon: '',
          auth: ['admin', 'normal'],
          isHidden: false,
        },
      },
      {
        path: '/page2',
        name: 'Page2',
        component: () => import('@/views/demo/page/page2'),
        meta: {
          title: 'page2',
          icon: '',
          auth: ['admin', 'normal'],
          isHidden: false,
        },
        children: [
          {
            path: '/page2-1',
            name: 'Page2-1',
            component: () => import('@/views/demo/page/page2/page2-1'),
            meta: {
              title: 'page2-1',
              icon: '',
              auth: ['admin', 'normal'],
              isHidden: false,
            },
          },
          {
            path: '/page2-2',
            name: 'Page2-2',
            component: () => import('@/views/demo/page/page2/page2-2'),
            meta: {
              title: 'page2-2',
              icon: '',
              auth: ['admin', 'normal'],
              isHidden: false,
            },
          },
        ],
      },
      {
        path: '/page3',
        name: 'Page3',
        component: () => import('@/views/demo/page/page3'),
        meta: {
          title: 'page3',
          icon: '',
          auth: ['admin', 'normal'],
          isHidden: false,
        },
        children: [
          {
            path: '/page3-1',
            name: 'Page3-1',
            component: () => import('@/views/demo/page/page3/page3-1'),
            meta: {
              title: 'page3-1',
              icon: '',
              auth: ['admin', 'normal'],
              isHidden: false,
            },
          },
          {
            path: '/page3-2',
            name: 'Page3-2',
            component: () => import('@/views/demo/page/page3/page3-2'),
            meta: {
              title: 'page3-2',
              icon: '',
              auth: ['admin', 'normal'],
              isHidden: false,
            },
            children: [
              {
                path: '/page3-2-1',
                name: 'Page3-2-1',
                component: () =>
                  import('@/views/demo/page/page3/page3-2/page3-2-1'),
                meta: {
                  title: 'page3-2-1',
                  icon: '',
                  auth: ['admin', 'normal'],
                  isHidden: false,
                },
              },
            ],
          },
        ],
      },
      /****************组件案例路由********************************** */
    ],
  },
  {
    path: '*',
    name: '*',
    redirect: '/404NotFound',
  },
]
