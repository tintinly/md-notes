import DefaultTheme from 'vitepress/theme'
import DocsNavgation from './components/DocsNavgation.vue' 
import ToastNotification from './components/ToastNotification.vue'
import CustomLayout from './layouts/CustomLayout.vue'
import './style/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('DocsNavgation', DocsNavgation)
    app.component('ToastNotification', ToastNotification)
  },
  Layout: CustomLayout
}