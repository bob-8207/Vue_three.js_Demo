import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Demo_1 from '@/components/Demo_1'
import Demo_2 from '@/components/Demo_2'
import Demo_3 from '@/components/Demo_3'
import Demo_5 from '@/components/Demo_5'
import Demo_6 from '@/components/Demo_6'
import Demo_template from '@/components/Demo_template'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo_6',
      component: Demo_6
    },
    {
      path: '/Demo_1',
      name: 'Demo_1',
      component: Demo_1
    },
    {
      path: '/Demo_2',
      name: 'Demo_2',
      component: Demo_2
    },
    {
      path: '/Demo_3',
      name: 'Demo_3',
      component: Demo_3
    },
    {
      path: '/Demo_5',
      name: 'Demo_5',
      component: Demo_5
    },
    {
      path: '/Demo_6',
      name: 'Demo_6',
      component: Demo_6
    },
    {
      path: '/Demo_template',
      name: 'Demo_template',
      component: Demo_template
    },
  ]
})
