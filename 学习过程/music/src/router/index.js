import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../components/recommend'
import song from '../components/song'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/song/id=:songid',
      name: 'song',
      component: song
    }
  ]
})
