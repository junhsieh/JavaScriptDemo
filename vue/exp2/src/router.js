import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SalesOrder from './views/SalesOrder.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/Dashboard',
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/SalesOrder',
      name: 'SalesOrder',
      component: SalesOrder,
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]
})
