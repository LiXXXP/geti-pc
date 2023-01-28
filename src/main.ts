import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/element-variables.scss'
// import locale from 'element-plus/lib/locale/lang/zh-cn'

import * as icons from '@element-plus/icons-vue'
import './styles/index.scss' // global css

import 'virtual:svg-icons-register'

// svg-icon
import SvgIcon from '@gwin/svg-icon'
import '@gwin/svg-icon/lib/theme-default/index.css'

// console-menu
import ConsoleMenu from '@gwin/platform-menu-pc'
import '@gwin/platform-menu-pc/lib/theme-default/index.css'

// 网络配置
import { commonConfig, requestContextConfig } from '@gwin/networking'
import config from './config'
requestContextConfig.entityId = 'geti'
commonConfig.loginCallback = () => {
  window.location.href = config.GWIN_URL_LOGIN
}

commonConfig.noPermissionCallback = () => {
  console.log('got to 403 page')
}

const win: any = window
win._AMapSecurityConfig = {
  securityJsCode: 'b90137675c2a4130295dc0107f0f2a00'
}

const app = createApp(App)

Object.keys(icons as any).forEach((key) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.component(key, icons[key])
})

app.use(router).use(store).use(SvgIcon).use(ConsoleMenu).use(ElementPlus).mount('#app')
