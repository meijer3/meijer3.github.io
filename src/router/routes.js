
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
          { path: 'smallProjects', component: () => import('pages/smallProjects.vue') },
          { path: 'wayfinding', component: () => import('pages/Wayfinding.vue') }
        ]
      }
    ]
  },
  {
    path: '/maps',
    name: 'maps',
    component: () => import('layouts/Maps.vue'),
    children: [
      {
        path: '/maps/Reisadvies',
        name: '/maps/Reisadvies',
        alias: '/Reisadvies',
        component: () => import('pages/reisadvies.vue')
      },
      {
        path: '/maps/sweden',
        name: '/maps/sweden',
        alias: '/sweden',
        component: () => import('pages/sweden-netherlands.vue')
      },
      {
        path: '/maps/json2python',
        alias: '/maps/python2json',
        name: 'Json 2 Python',
        component: () => import('pages/json2py.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
