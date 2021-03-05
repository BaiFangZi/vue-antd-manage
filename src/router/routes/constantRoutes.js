export default [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout'),
    meta: {
      title: 'layout',
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
      title: 'notFound',
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
