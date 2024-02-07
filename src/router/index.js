import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import DarsView from '../views/DarsView.vue'
import Policy from '../views/Policy.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:Darse/:surah',
    name: 'darsView',
    component:DarsView
  },
  {
    path: '/category/:categoryType',
    name: 'category',
    component: CategoryView
  },
  {
    path: '/policy',
    name: 'policy',
    component: Policy
  },
  {
    path: '/:catchAll(.*)', // This will match any path
    redirect: '/', // Redirect to the home route
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
