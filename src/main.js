import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/utils/request'
import '@/icons'

Vue.use(Element, { locale })

Vue.config.productionTip = false

store.dispatch('updateUserInfo', {
  token: window.localStorage.getItem('token'),
  userInfo: window.localStorage.getItem('userInfo')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
