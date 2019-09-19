import Vue from 'vue'
import Router from 'vue-router'
import PackedRain from '../components/PackedRain'
import CssPacked from '../components/CssPacked'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PackedRain',
      component: PackedRain
    },
    {
        path: '/cssPacked',
        name: 'CssPacked',
        component: CssPacked
      }
  ]
})
