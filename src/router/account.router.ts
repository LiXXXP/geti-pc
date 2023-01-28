import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const appRoutes: Array<RouteConfig> = [
  {
    path: '/account',
    name: 'Account',
    component: Layout,
    redirect: '/account/information',
    meta: { title: '个人中心', icon: 'users', keepAlive: false },
    children: [
      {
        path: 'information',
        name: 'Information',
        component: () => import('@/views/account/info/index.vue'),
        meta: {
          title: '基本信息',
          requireAuth: true // 需要登录
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/account/settings/index.vue'),
        meta: {
          title: '安全设置',
          requireAuth: true // 需要登录
        }
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        hidden: true,
        component: () => import('@/views/account/password/index.vue'),
        meta: {
          title: '修改密码',
          requireAuth: true // 需要登录
        }
      },
      {
        path: 'changeMobile',
        name: 'changeMobile',
        hidden: true,
        component: () => import('@/views/account/mobile/index.vue'),
        meta: {
          title: '修改手机号',
          requireAuth: true // 需要登录
        }
      },
      {
        path: 'rule',
        name: 'Rule',
        component: () => import('@/views/account/rule/index.vue'),
        meta: {
          title: '收费规则',
          requireAuth: true // 需要登录
        }
      }
    ]
  }
]

export default appRoutes
