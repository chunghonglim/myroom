import Vue from 'vue'
import Router from 'vue-router'
import content from '../components/content'
import detail from '../components/detail'
import earth from '../components/earth'
import hill from '../components/hill'
import car from '../components/car'
import loud from '../components/loud'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: content
    },
    {
      path: '/detail',
      component: detail,
      redirect: '/detail/earth',
      children: [
      {
        path: 'earth',
        component: earth
      },
      {
        path: 'hill',
        component: hill
      },
      {
        path: 'car',
        component: car
      },
      {
        path: 'loud',
        component: loud
      },
    ]
    }
  ]
})
