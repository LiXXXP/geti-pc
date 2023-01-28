import { RouteRecordRaw } from 'vue-router'

// 联合类型
type RouteConfig = RouteRecordRaw & {
  hidden?: boolean
  meta?: { activeMenu?: boolean; highlightKey?: string }
  children?: RouteConfig[]
}
