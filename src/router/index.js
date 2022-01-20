import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: 'BlogList'}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blogList',
    name: 'BlogList',
    component: () => import('../views/BlogList.vue')
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    meta: {
      requireAuth: true
    },
    component:() => import('../views/BlogEdit.vue')
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component:() => import('../views/BlogDetail.vue')
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component:() => import('../views/BlogEdit.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
