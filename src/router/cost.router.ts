import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const appRoutes: Array<RouteConfig> = [
  {
    path: '/cost',
    name: 'Cost',
    component: Layout,
    redirect: '/cost/wallet',
    meta: { title: '费用中心', icon: 'code', keepAlive: false },
    children: [
      {
        path: 'wallet',
        name: 'Wallet',
        component: () => import('@/views/cost/wallet/index.vue'),
        meta: {
          title: '我的钱包',
          requireAuth: true // 需要登录
        }
      },
      {
        path: 'bill',
        name: 'Bill',
        component: () => import('@/views/cost/wallet/index.vue'),
        meta: {
          title: '账单统计',
          requireAuth: true // 需要登录
        }
      },
      {
        path: 'pay',
        name: 'Pay',
        hidden: true,
        component: () => import('@/views/cost/pay/index.vue'),
        meta: {
          title: '充值',
          requireAuth: true // 需要登录
        }
      }
    ]
  }
]

export default appRoutes
