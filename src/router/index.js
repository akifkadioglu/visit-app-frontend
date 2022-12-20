import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Maps from '../views/Maps.vue'
import Calendar from '../views/Calendar.vue'
import Visits from '../views/Visits.vue'
import People from '../views/People.vue'
import Personnels from '../views/Personnels.vue'
import Account from '../views/Account.vue'
import Login from '../views/Login.vue'
import Sectors from '../views/Sectors.vue'

Vue.use(VueRouter)
import { middlewares } from './middlewares'

const routes = [
  {
    path: '/giris-yap',
    name: 'Login',
    component: Login,
    beforeEnter: middlewares.login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: middlewares.auth

  },
  {
    path: '/haritalar',
    name: 'Maps',
    component: Maps,
    beforeEnter: middlewares.auth
  },
  {
    path: '/takvim',
    name: 'Calendar',
    component: Calendar,
    beforeEnter: middlewares.auth
  },
  {
    path: '/ziyaretler',
    name: 'Visits',
    component: Visits,
    beforeEnter: (to, from, next) => {
      middlewares.auth(to, from, next)
      middlewares.admin(to, from, next)
    }

  },
  {
    path: '/kisiler',
    name: 'People',
    component: People,
    beforeEnter: middlewares.auth
  },
  {
    path: '/sektorler',
    name: 'Sectors',
    component: Sectors,
    beforeEnter: (to, from, next) => {
      middlewares.auth(to, from, next)
      middlewares.admin(to, from, next)
    }
  },
  {
    path: '/personeller',
    name: 'Personnels',
    component: Personnels,
    beforeEnter: (to, from, next) => {
      middlewares.auth(to, from, next)
      middlewares.admin(to, from, next)
    }
  },
  {
    path: '/hesabim',
    name: 'Account',
    component: Account,
    beforeEnter: middlewares.auth
  },
  {
    path: '*',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
