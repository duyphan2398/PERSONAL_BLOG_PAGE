import Resource from '@/components/Resource'
import { AuthGuard, LoginGuard, ResolveGuard } from '@/router/guards'

import { PERMISSIONS } from '@/enum/permissions.enum'

export function page (path) {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${path}`)
}

export const routes = [
  // CMS
  // Login
  {
    path: '/cms/login',
    name: 'cms.login',
    component: page('Login.vue'),
    meta: { layout: 'auth' },
    beforeEnter: ResolveGuard([LoginGuard])
  },

  // Notice
  {
    path: '/cms/notice',
    component: Resource,
    children: [
      {
        path: '',
        name: 'notice.index',
        component: page('notice/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_notice_list',
          permissions: [PERMISSIONS.VIEW_NOTICE],
          breadcrumbs: [
            { title: 'page_notice_list', name: 'notice.index' }
          ]
        }
      },
      {
        path: '/notice/create',
        name: 'notice.create',
        component: page('notice/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_notice_create',
          permissions: [PERMISSIONS.CREATE_NOTICE],
          breadcrumbs: [
            { title: 'page_notice_list', name: 'notice.index' },
            { title: 'page_notice_create', name: 'notice.create' }
          ]
        }
      },
      {
        path: '/notice/:id/edit',
        name: 'notice.edit',
        component: page('notice/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_notice_edit',
          permissions: [PERMISSIONS.VIEW_NOTICE],
          breadcrumbs: [
            { title: 'page_notice_list', name: 'notice.index' },
            { title: 'page_notice_edit', name: 'notice.edit' }
          ]
        }
      }
    ]
  },

  // Admin (HOME)
  {
    path: '/cms/',
    component: Resource,
    children: [
      {
        path: '',
        name: 'cms.admin.edit',
        component: page('admin/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_admin_edit',
          breadcrumbs: [
            { title: 'page_admin_edit', name: 'cms.admin.edit' }
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
