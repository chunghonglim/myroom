// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import music from './music'
import router from './router'
import Axios from 'axios'
import store from './store/store'
import './assets/icon/iconfont.css'


Vue.prototype.$axios = Axios;
Vue.config.productionTip = false


Axios.defaults.baseURL = 'http://localhost:3000/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { music },
  template: '<music/>'
})
