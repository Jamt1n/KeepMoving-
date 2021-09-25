import { createRouter as cr, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'

const isServer = typeof window === 'undefined';

const history = isServer ? createMemoryHistory() : createWebHistory()

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

export default function createRouter() {
  return cr({history, routes})
}
