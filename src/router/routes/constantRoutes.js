export default [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout'),
    meta: {
      title: '布局',
      icon: '',
      auth: ['admin', 'normal'],
      // isHidden: true,
    },
    redirect: '/dashboard',
    children: [],
  },
  {
    path: '/404NotFound',
    name: 'NotFound',
    component: () => import('@/views/404NotFound'),
    meta: {
      title: 'NotFound',
      icon: '',
      auth: ['admin', 'normal'],
      // isHidden: true,
    },
  },

  {
    path: '*',
    name: '*',
    redirect: '/404NotFound',
  },
]
