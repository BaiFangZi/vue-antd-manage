export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard'),
    meta: {
      title: '主页',
      icon: '',
      auth: ['admin', 'normal'],
      // isHidden: true,
    },
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('@/views/demo/table'),
    meta: {
      title: '表格',
      icon: '',
      auth: ['admin', 'normal'],
      // isHidden: true,
    },
  },
  {
    path: '/modal',
    name: 'Modal',
    component: () => import('@/views/demo/modal'),
    meta: {
      title: '对话框',
      icon: '',
      auth: ['admin', 'normal'],
      // isHidden: true,
    },
  },
  //
  {
    path: '/drawer',
    name: 'Drawer',
    component: () => import('@/views/demo/drawer'),
    meta: {
      title: '抽屉',
      icon: '',
      auth: ['admin', 'normal'],
      // isHidden: true,
    },
  },
  //无限菜单
  {
    path: '/infinitePage',
    name: 'InfinitePage',
    component: () => import('@/views/demo/infinitePage'),
    meta: {
      title: '无限级菜单',
      icon: '',
      auth: ['admin', 'normal'],
      // isHidden: true,
      noBreadcrumbLink: true, //面包屑导航，显示为普通文本
    },
    children: [
      {
        path: '/page1',
        name: 'Page1',
        component: () => import('@/views/demo/infinitePage/page1'),
        meta: {
          title: 'page1',
          icon: '',
          auth: ['admin', 'normal'],
          // isHidden: false,
        },
      },
      {
        path: '/page2',
        name: 'Page2',
        component: () => import('@/views/demo/infinitePage/page2'),
        meta: {
          title: 'page2',
          icon: '',
          auth: ['admin', 'normal'],
          // isHidden: false,
          noBreadcrumbLink: true,
        },
        children: [
          {
            path: '/page2-1',
            name: 'Page2-1',
            component: () => import('@/views/demo/infinitePage/page2/page2-1'),
            meta: {
              title: 'page2-1',
              icon: '',
              auth: ['admin', 'normal'],
              // isHidden: false,
            },
          },
          {
            path: '/page2-2',
            name: 'Page2-2',
            component: () => import('@/views/demo/infinitePage/page2/page2-2'),
            meta: {
              title: 'page2-2',
              icon: '',
              auth: ['admin', 'normal'],
              // isHidden: false,
            },
          },
        ],
      },
      {
        path: '/page3',
        name: 'Page3',
        component: () => import('@/views/demo/infinitePage/page3'),
        meta: {
          title: 'page3',
          icon: '',
          auth: ['admin', 'normal'],
          // isHidden: false,
        },
        children: [
          {
            path: '/page3-1',
            name: 'Page3-1',
            component: () => import('@/views/demo/infinitePage/page3/page3-1'),
            meta: {
              title: 'page3-1',
              icon: '',
              auth: ['admin', 'normal'],
              // isHidden: false,
              noBreadcrumbLink: true,
            },
          },
          {
            path: '/page3-2',
            name: 'Page3-2',
            component: () => import('@/views/demo/infinitePage/page3/page3-2'),
            meta: {
              title: 'page3-2',
              icon: '',
              auth: ['admin', 'normal'],
              // isHidden: false,
            },
            children: [
              {
                path: '/page3-2-1',
                name: 'Page3-2-1',
                component: () =>
                  import('@/views/demo/infinitePage/page3/page3-2/page3-2-1'),
                meta: {
                  title: 'page3-2-1',
                  icon: '',
                  auth: ['admin', 'normal'],
                  // isHidden: false,
                  noBreadcrumbLink: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  //权限管理
  {
    path: '/permission',
    name: 'Permission',
    component: () => import('@/views/demo/permission'),
    meta: {
      title: '权限管理',
      icon: '',
      auth: ['admin', 'normal'],
      noBreadcrumbLink: true,
    },
    children: [
      {
        path: '/permission/admin',
        name: 'permissionAdmin',
        component: () => import('@/views/demo/permission/admin'),
        meta: {
          title: '管理员',
          icon: '',
          auth: ['admin'],
        },
      },
      {
        path: '/permission/normal',
        name: 'permissionNormal',
        component: () => import('@/views/demo/permission/normal'),
        meta: {
          title: '普通用户',
          icon: '',
          auth: ['normal'],
        },
      },
    ],
  },
]
