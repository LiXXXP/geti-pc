import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw
} from 'vue-router'
import cloudRoutes from './cloud.router'
import accountRoutes from './account.router'
import costRoutes from './cost.router'
import commonRoutes from './common.router'
import getPageTitle from '../utils/get-page-title'

const routes: Array<RouteRecordRaw> = [...commonRoutes, ...cloudRoutes, ...accountRoutes, ...costRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior: scrollBehavior
})

function scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, savedPosition: any | null) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { el: '#app', top: 0, left: 0, behavior: 'auto' }
  }
}

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = getPageTitle(title)
  }
  next()
})

export default router
