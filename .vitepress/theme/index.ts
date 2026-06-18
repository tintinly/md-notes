import DefaultTheme from 'vitepress/theme'
import MyComponent from './components/DocsNavgation.vue' //必须是.vue结尾
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('MyComponent', MyComponent)
    }
}