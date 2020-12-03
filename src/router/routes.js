import Resource from '@/components/Resource'
import { AuthGuard, LoginGuard, ResolveGuard } from '@/router/guards'

import { PERMISSIONS } from '@/enum/permissions.enum'

export function page (path) {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${path}`)
}

export const routes = [
  // Login
  {
    path: '/login',
    name: 'login',
    component: page('Login.vue'),
    meta: { layout: 'auth' },
    beforeEnter: ResolveGuard([LoginGuard])
  },

  // Home
  {
    path: '/',
    name: 'home',
    component: page('Home.vue'),
    meta: {
      title: 'dashboard',
      permissions: [PERMISSIONS.VIEW_DASHBOARD],
      breadcrumbs: []
    },
    beforeEnter: ResolveGuard([AuthGuard])
  },

  // Device
  {
    path: '/device',
    component: Resource,
    children: [
      {
        path: '',
        name: 'device.index',
        component: page('device/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_device_list',
          permissions: [PERMISSIONS.VIEW_DEVICE],
          breadcrumbs: [
            { title: 'page_device_list', name: 'device.index' }
          ]
        }
      },
      {
        path: '/device/create',
        name: 'device.create',
        component: page('device/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          type: 'device',
          permissions: [PERMISSIONS.CREATE_DEVICE],
          title: 'page_device_list',
          breadcrumbs: [
            { title: 'page_device_list', name: 'device.index' },
            { title: 'page_device_create', name: 'device.create' }
          ]
        }
      },
      {
        path: '/device/:id/edit',
        name: 'device.edit',
        component: page('device/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          type: 'device',
          permissions: [PERMISSIONS.VIEW_DEVICE],
          title: 'page_device_list',
          breadcrumbs: [
            { title: 'page_device_list', name: 'device.index' },
            { title: 'device_update_page', name: 'device.edit' }
          ]
        }
      }
    ]
  },

  // App top
  {
    path: '/apptop',
    component: Resource,
    children: [
      {
        path: '',
        name: 'app_top.index',
        component: page('appTop/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_app_top_list',
          permissions: [PERMISSIONS.VIEW_APP_TOP],
          breadcrumbs: [
            { title: 'page_app_top_list', name: 'app_top.index' }
          ]
        }
      }
    ]
  },

  // Notice
  {
    path: '/notice',
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
  // Admin
  {
    path: '/admin',
    component: Resource,
    children: [
      {
        path: '',
        name: 'admin.index',
        component: page('admin/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_admin_list',
          permissions: [PERMISSIONS.VIEW_ADMIN],
          breadcrumbs: [
            { title: 'page_admin_list', name: 'admin.index' }
          ]
        }
      },
      {
        path: '/admin/create',
        name: 'admin.create',
        component: page('admin/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_admin_create',
          permissions: [PERMISSIONS.CREATE_ADMIN],
          breadcrumbs: [
            { title: 'page_admin_list', name: 'admin.index' },
            { title: 'page_admin_create', name: 'admin.create' }
          ]
        }
      },
      {
        path: '/admin/:id/edit',
        name: 'admin.edit',
        component: page('admin/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'page_admin_edit',
          permissions: [PERMISSIONS.VIEW_ADMIN],
          breadcrumbs: [
            { title: 'page_admin_list', name: 'admin.index' },
            { title: 'page_admin_edit', name: 'admin.edit' }
          ]
        }
      }
    ]
  },

  // Role
  {
    path: '/role',
    component: Resource,
    children: [
      {
        path: '',
        name: 'role.index',
        component: page('role/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'role_list_page',
          permissions: [PERMISSIONS.VIEW_ROLE],
          breadcrumbs: [
            { title: 'role_list_page', name: 'role.index' }
          ]
        }
      },
      {
        path: '/role/create',
        name: 'role.create',
        component: page('role/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'role_create_page',
          permissions: [PERMISSIONS.CREATE_ROLE],
          breadcrumbs: [
            { title: 'role_list_page', name: 'role.index' },
            { title: 'role_create_page', name: 'role.create' }
          ]
        }
      },
      {
        path: '/role/:id/edit',
        name: 'role.edit',
        component: page('role/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'role_edit_page',
          permissions: [PERMISSIONS.VIEW_ROLE],
          breadcrumbs: [
            { title: 'role_list_page', name: 'role.index' },
            { title: 'role_edit_page', name: 'role.edit' }
          ]
        }
      }
    ]
  },

  // Push
  {
    path: '/push',
    component: Resource,
    children: [
      {
        path: '',
        name: 'push.index',
        component: page('push/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'push_list_page',
          permissions: [PERMISSIONS.VIEW_PUSH],
          breadcrumbs: [
            { title: 'push_list_page', name: 'push.index' }
          ]
        }
      },
      {
        path: '/push/create',
        name: 'push.create',
        component: page('push/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'push_create_page',
          permissions: [PERMISSIONS.CREATE_PUSH],
          breadcrumbs: [
            { title: 'push_list_page', name: 'push.index' },
            { title: 'push_create_page', name: 'push.create' }
          ]
        }
      },
      {
        path: '/push/:id/edit',
        name: 'push.edit',
        component: page('push/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'push_edit_page',
          permissions: [PERMISSIONS.VIEW_PUSH],
          breadcrumbs: [
            { title: 'push_list_page', name: 'push.index' },
            { title: 'push_edit_page', name: 'push.edit' }
          ]
        }
      },
      {
        path: '/push/:id/duplicate',
        name: 'push.duplicate',
        component: page('push/Duplicate.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'push_create_page',
          permissions: [PERMISSIONS.CREATE_PUSH],
          breadcrumbs: [
            { title: 'push_list_page', name: 'push.index' },
            { title: 'push_create_page', name: 'push.create' }
          ]
        }
      }
    ]
  },

  // Movie
  {
    path: '/movie',
    component: Resource,
    children: [
      {
        path: '',
        name: 'movie.index',
        component: page('movie/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'movie_list_page',
          permissions: [PERMISSIONS.VIEW_MOVIE],
          breadcrumbs: [
            { title: 'movie_list_page', name: 'movie.index' }
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
          permissions: PERMISSIONS.ALL,
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
          permissions: PERMISSIONS.ALL,
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
          permissions: PERMISSIONS.ALL,
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
          permissions: PERMISSIONS.ALL,
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
          permissions: PERMISSIONS.ALL,
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
          permissions: PERMISSIONS.ALL,
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
          permissions: PERMISSIONS.ALL,
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
