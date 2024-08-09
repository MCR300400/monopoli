import AboutView from '@/views/AboutView.vue'
import GameView from '@/views/GameView.vue'
import HomePageView from '@/views/HomePageView.vue'
import RoulesView from '@/views/RoulesView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePageView
  },
  {
    path: '/roules',
    name: 'Roules',
    component: RoulesView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/game/:idGame',
    name: 'Game',
    component: GameView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
