/* @flow */
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import VueMaterial from 'vue-material'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import routes from './routers'
import VuexStore from './store'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: {
    color: 'indigo',
    hue: 500
  },
  warn: {
    color: 'red',
    hue: 500
  },
  background: 'white'
})

const store = new Vuex.Store(VuexStore)
const router = new VueRouter({
  mode: 'history',
  routes
})
sync(store, router)

new Vue({
  router,
  store
}).$mount('#app')
