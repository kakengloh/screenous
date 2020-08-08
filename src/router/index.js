import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Recorder from '@/views/Recorder.vue'
import Player from '@/views/Player.vue'
import Tutorial from '@/views/Tutorial.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: Tutorial
  },
  {
    path: '/recorder',
    name: 'Recorder',
    component: Recorder
  },
  {
    path: '/play/:slug',
    name: 'Player',
    component: Player
  },
]

const router = new VueRouter({
  routes
})

export default router
