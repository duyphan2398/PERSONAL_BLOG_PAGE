// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// import plugins
import './plugins'
import './plugins/validation'
import './plugins/antdesign'
import './plugins/lazyload'
import './plugins/progress-bar'
import i18n from './plugins/i18n'

// import filter
import './utils/filters'
import './mixins/global.mixin'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n: i18n, // language
  render: h => h(App)
}).$mount('#app')
