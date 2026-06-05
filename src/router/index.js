import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlanetDetail from '../views/PlanetDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/planeta/:id',
    name: 'planeta',
    component: PlanetDetail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
