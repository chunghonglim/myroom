import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../components/recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      component: recommend
    }
  ]
})
