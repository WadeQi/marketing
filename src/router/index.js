import Vue from 'Vue'
import Router from 'vue-router'
import PackedRain from '../components/PackedRain.vue'
Vue.use(Router)
export default new Router({
    routes:[
        {
            path:'/',
            name:'PackedRain',
            component: PackedRain
        }
    ]
})