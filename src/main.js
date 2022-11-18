import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueApexCharts from 'vue-apexcharts'
require('dotenv').config()
const moment = require('moment')
require('moment/locale/tr')

Vue.use(require('vue-moment'), {
  moment
})
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_API,
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
