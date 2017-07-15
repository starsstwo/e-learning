/* @flow */
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {
  sync
} from 'vuex-router-sync'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import routes from './routers'
import VuexStore from './store'
// eslint-disable-next-line
import ElementUI from 'element-ui'
// eslint-disable-next-line
import locale from 'element-ui/lib/locale/lang/ja'
// eslint-disable-next-line
import VueTimeago from 'vue-timeago'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(ElementUI, {
  locale
})
Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'vi-VN',
  locales: {
    // eslint-disable-next-line
    'vi-VN': require('vue-timeago/locales/vi-VN.json')
  }
})
Vue.config.productionTip = false

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
