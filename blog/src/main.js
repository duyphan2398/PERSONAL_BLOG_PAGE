import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false


import './plugins'
import './plugins/lazy-load'
import './plugins/progress-bar'
import './plugins/validation'
import './plugins/antdesign'
import i18n from './plugins/i18n'

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
