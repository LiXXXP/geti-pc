import { RouteConfig } from '#/global'

const appRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/forget/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/truckRoutePlayback',
    name: 'TruckRoutePlayback',
    component: () => import('@/views/truck-route-playback/index.vue')
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('@/views/agreement/index.vue')
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import('@/views/recharge/index.vue')
  },
  {
    path: '/user',
    name: 'UserAgreement',
    component: () => import('@/views/user/index.vue')
  }
]

export default appRoutes
