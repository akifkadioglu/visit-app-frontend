import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAdmin: false,
        people: [],
        personnels: [],
        sectors: [],
        roles: [],
        userPeople: [],
    },
    mutations: {},
    actions: {},
    modules: {}
})
