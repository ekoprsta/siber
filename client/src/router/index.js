import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterPage')
  },
  {
    path: '/absen',
    name: 'AbsenPage',
    component: () => import('../views/AbsenPage')
  },
  {
    path: '/class',
    name: 'CreateClassPage',
    component: () => import('../views/CreateClassPage')
  },
  {
    path: '/edit',
    name: 'EditClass',
    component: () => import('../views/EditClass')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if ((to.path !== '/login' && to.path !== '/register') && !localStorage.accesstoken) next({ path: '/login', query: { error: 'please login first' } })
  else if (to.path === '/login' && localStorage.accesstoken) next({ path: '/', query: { error: 'already log in' } })
  else next()
})

export default router
