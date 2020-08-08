import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase'
import config from '../config'

firebase.initializeApp(config.firebase)

import FirebaseMixin from '@/mixins/Firebase'

Vue.config.productionTip = false

Vue.mixin(FirebaseMixin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')