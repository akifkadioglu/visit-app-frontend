import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Maps from '../views/Maps.vue'
import Calendar from '../views/Calendar.vue'
import Visits from '../views/Visits.vue'
import AddSomeone from '../views/AddSomeone.vue'
import Personels from '../views/Personels.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/kisi-ekle',
    name: 'AddSomeone',
    component: AddSomeone
  },
  {
    path: '/personeller',
    name: 'Personels',
    component: Personels
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
