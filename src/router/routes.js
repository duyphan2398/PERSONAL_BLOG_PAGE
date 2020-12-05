import Resource from '@/components/Resource'
import { AuthGuard, LoginGuard, ResolveGuard } from '@/router/guards'

export function page (path) {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${path}`)
}

export const routes = [
  // CMS
  // Login
  {
    path: '/login/',
    name: 'login',
    component: page('Login.vue'),
    meta: { layout: 'auth' },
    beforeEnter: ResolveGuard([LoginGuard])
  },

  // Notice
  {
    path: '/post',
    component: Resource,
    children: [
      {
        path: '',
        name: 'post.index',
        component: page('post/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_post_list',
          breadcrumbs: [
            { title: 'page_post_list', name: 'post.index' }
          ]
        }
      },
      {
        path: 'create',
        name: 'post.create',
        component: page('post/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_post_create',
          breadcrumbs: [
            { title: 'page_post_list', name: 'post.index' },
            { title: 'page_post_create', name: 'post.create' }
          ]
        }
      },
      {
        path: ':id/edit',
        name: 'post.edit',
        component: page('notice/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_notice_edit',
          breadcrumbs: [
            { title: 'page_post_list', name: 'post.index' },
            { title: 'page_post_edit', name: 'post.edit' }
          ]
        }
      }
    ]
  },

  // Admin (HOME)
  {
    path: '',
    component: Resource,
    children: [
      {
        path: '',
        name: 'admin.edit',
        component: page('admin/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_admin_edit',
          breadcrumbs: [
            { title: 'page_admin_edit', name: 'admin.edit' }
          ]
        }
      }
    ]
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
