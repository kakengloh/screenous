import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase'
import config from '../config'
import './extensions'

firebase.initializeApp(config.firebase)

import FirebaseMixin from '@/mixins/Firebase'

import 'bootstrap/dist/css/bootstrap.css'

import 'semantic-ui-css/semantic.min.css';
import SuiVue from 'semantic-ui-vue'
Vue.use(SuiVue)

Vue.config.productionTip = false

Vue.mixin(FirebaseMixin)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')