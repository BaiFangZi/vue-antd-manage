export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard'),
    meta: {
      title: 'dashboard',
      icon: '',
      auth: ['admin', 'normal'],
      // noHidden: true,
    },
  },
  {
    path: '/userCenter',
    name: 'UserCenter',
    component: () => import('@/views/userCenter'),
    meta: {
      title: 'userCenter',
      icon: '',
      auth: ['admin', 'normal'],
      noHidden: true,
    },
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('@/views/table'),
    meta: {
      title: 'table',
      icon: '',
      auth: ['admin', 'normal'],
      // noHidden: true,
    },
  },
  // {
  //   path: '/modal',
  //   name: 'Modal',
  //   component: () => import('@/views/modal'),
  //   meta: {
  //     title: '对话框',
  //     icon: '',
  //     auth: ['admin', 'normal'],
  //     // noHidden: true,
  //   },
  // },
  // //
  // {
  //   path: '/drawer',
  //   name: 'Drawer',
  //   component: () => import('@/views/drawer'),
  //   meta: {
  //     title: '抽屉',
  //     icon: '',
  //     auth: ['admin', 'normal'],
  //     // noHidden: true,
  //   },
  // },
  //无限菜单
  {
    path: '/infinitePage',
    name: 'InfinitePage',
    component: () => import('@/views/infinitePage'),
    meta: {
      title: 'infinitePage',
      icon: '',
      auth: ['admin', 'normal'],
      // noHidden: true,
      noBreadcrumbLink: true, //面包屑导航，显示为普通文本
    },
    children: [
      {
        path: '/page1',
        name: 'Page1',
        component: () => import('@/views/infinitePage/page1'),
        meta: {
          title: 'page1',
          icon: '',
          auth: ['admin', 'normal'],
          // noHidden: false,
        },
      },
      {
        path: '/page2',
        name: 'Page2',
        component: () => import('@/views/infinitePage/page2'),
        meta: {
          title: 'page2',
          icon: '',
          auth: ['admin', 'normal'],
          // noHidden: false,
          noBreadcrumbLink: true,
        },
        children: [
          {
            path: '/page2-1',
            name: 'Page2-1',
            component: () => import('@/views/infinitePage/page2/page2-1'),
            meta: {
              title: 'page2_1',
              icon: '',
              auth: ['admin', 'normal'],
              // noHidden: false,
            },
          },
          {
            path: '/page2-2',
            name: 'Page2-2',
            component: () => import('@/views/infinitePage/page2/page2-2'),
            meta: {
              title: 'page2_2',
              icon: '',
              auth: ['admin', 'normal'],
              // noHidden: false,
            },
          },
        ],
      },
      {
        path: '/page3',
        name: 'Page3',
        component: () => import('@/views/infinitePage/page3'),
        meta: {
          title: 'page3',
          icon: '',
          auth: ['admin', 'normal'],
          // noHidden: false,
        },
        children: [
          {
            path: '/page3-1',
            name: 'Page3-1',
            component: () => import('@/views/infinitePage/page3/page3-1'),
            meta: {
              title: 'page3_1',
              icon: '',
              auth: ['admin', 'normal'],
              // noHidden: false,
              noBreadcrumbLink: true,
            },
          },
          {
            path: '/page3-2',
            name: 'Page3-2',
            component: () => import('@/views/infinitePage/page3/page3-2'),
            meta: {
              title: 'page3_2',
              icon: '',
              auth: ['admin', 'normal'],
              // noHidden: false,
            },
            children: [
              {
                path: '/page3-2-1',
                name: 'Page3-2-1',
                component: () =>
                  import('@/views/infinitePage/page3/page3-2/page3-2-1'),
                meta: {
                  title: 'page3_2_1',
                  icon: '',
                  auth: ['admin', 'normal'],
                  // noHidden: false,
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
    component: () => import('@/views/permission'),
    meta: {
      title: 'permission',
      icon: '',
      auth: ['admin', 'normal'],
      noBreadcrumbLink: true,
    },
    children: [
      {
        path: '/permission/admin',
        name: 'permissionAdmin',
        component: () => import('@/views/permission/admin'),
        meta: {
          title: 'admin',
          icon: '',
          auth: ['admin'],
        },
      },
      {
        path: '/permission/normal',
        name: 'permissionNormal',
        component: () => import('@/views/permission/normal'),
        meta: {
          title: 'normal',
          icon: '',
          auth: ['admin', 'normal'],
        },
      },
      {
        path: '/permission/authBtn',
        name: 'permissionAuthBtn',
        component: () => import('@/views/permission/authBtn'),
        meta: {
          title: 'permissionBtn',
          icon: '',
          auth: ['admin', 'normal'],
        },
      },
    ],
  },
  //echarts图表
  {
    path: '/charts',
    name: 'Charts',
    component: () => import('@/views/charts'),
    meta: {
      title: 'chart',
      icon: '',
      auth: ['admin', 'normal'],
    },
  },
  // 文件导出
  {
    path: '/exportFile',
    name: 'ExportFile',
    component: () => import('@/views/exportFile'),
    meta: {
      title: 'exportFile',
      icon: '',
      auth: ['admin', 'normal'],
    },
  },
  //编辑器
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('@/views/editor'),
    meta: {
      title: 'editor',
      icon: '',
      auth: ['admin', 'normal'],
    },
  },
]
