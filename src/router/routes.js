
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Index.vue'),
        children: [
          { path: 'boring', component: () => import('pages/boring.vue') },
          { path: 'c2000', component: () => import('pages/C2000.vue') },
          { path: 'datalab', component: () => import('pages/datalab.vue') },
          { path: 'fme', component: () => import('pages/fme.vue') },
          { path: 'glacier', component: () => import('pages/glacier.vue') },
          { path: 'wayfinding', component: () => import('pages/Wayfinding.vue') }
        ]
      }
    ]
  },
  {
    path: '/api',
    component: () => import('layouts/Api.vue')
  },
  {
    path: '/json',
    component: () => import('pages/json2py.vue')
  },
  {
    path: '/reisadvies',
    component: () => import('pages/reisadvies.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
