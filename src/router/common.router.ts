import { RouteConfig } from '#/global'

const commonRoutes: Array<RouteConfig> = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/'
  }
]

export default commonRoutes
