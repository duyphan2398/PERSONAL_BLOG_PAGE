export function page (path) {
  return () => import(`@/pages/${path}`)
}
import Resource from '@/components/Resource'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: page('home/index.vue'),
  },
  {
    path: '/stories',
    component: Resource,
    children: [
      {
        path: '',
        name: 'stories.index',
        component: page('stories/index.vue'),
      },
      {
        path: ':slug',
        name: 'stories.detail',
        component: page('stories/detail.vue'),
      },
    ],
  },

  {
    path: '/projects',
    component: Resource,
    children: [
      {
        path: '',
        name: 'projects.index',
        component: page('projects/index.vue'),
      },
      {
        path: ':slug',
        name: 'projects.detail',
        component: page('projects/detail.vue'),
      },
    ],
  },

  // Error
  {
    path: '/error',
    component: Resource,
    children: [
      {
        path: '/400',
        name: 'error.400',
        component: page('error/Error400.vue'),
        meta: {
          title: '',
          breadcrumbs: [
            { title: 'error', name: 'error.400' }
          ]
        }
      },
      {
        path: '/403',
        name: 'error.403',
        component: page('error/Error403.vue'),
        meta: {
          title: '',
          breadcrumbs: [
            { title: 'error', name: 'error.403' }
          ]
        }
      },
      {
        path: '/404',
        name: 'error.404',
        component: page('error/Error404.vue'),
        meta: {
          title: '',
          breadcrumbs: [
            { title: 'error', name: 'error.404' }
          ]
        }
      },
      {
        path: '/409',
        name: 'error.409',
        component: page('error/Error409.vue'),
        meta: {
          title: '',
          breadcrumbs: [
            { title: 'error', name: 'error.409' }
          ]
        }
      },
      {
        path: '/429',
        name: 'error.429',
        component: page('error/Error429.vue'),
        meta: {
          title: '',
          breadcrumbs: [
            { title: 'error', name: 'error.429' }
          ]
        }
      },
      {
        path: '/500',
        name: 'error.500',
        component: page('error/Error500.vue'),
        meta: {
          title: '',
          breadcrumbs: [
            { title: 'error', name: 'error.500' }
          ]
        }
      },
      {
        path: '/503',
        name: 'error.503',
        component: page('error/Error503.vue'),
        meta: {
          title: '',
          breadcrumbs: [
            { title: 'error', name: 'error.503' }
          ]
        }
      }
    ]
  },

  // Page not found
  {
    path: '*',
    component: page('error/Error404.vue')
  }
]
