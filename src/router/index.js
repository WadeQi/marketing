import Vue from 'vue'
import Router from 'vue-router'
import PackedRain from '../components/PackedRain'
import CssPacked from '../components/CssPacked'
import LuckyWheel from '../components/LuckyWheel'
import LuckyDial from '../components/LuckyDial'
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
    },
    {
      path: '/LuckyWheel',
      name: 'LuckyWheel',
      component: LuckyWheel
    },
    {
      path: '/LuckyDial',
      name: 'LuckyDial',
      component: LuckyDial
    }
  ]
})
