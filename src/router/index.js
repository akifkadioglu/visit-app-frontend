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

Vue.use(VueRouter)

const routes = [
  {
    path: '/giris-yap',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/haritalar',
    name: 'Maps',
    component: Maps
  },
  {
    path: '/takvim',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/ziyaretler',
    name: 'Visits',
    component: Visits
  },
  {
    path: '/kisiler',
    name: 'People',
    component: People
  },
  {
    path: '/personeller',
    name: 'Personnels',
    component: Personnels
  },
  {
    path: '/hesabim',
    name: 'Account',
    component: Account
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
