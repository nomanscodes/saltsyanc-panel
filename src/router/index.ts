import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReferralsView from '../views/ReferralsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home' }
    },
    {
      path: '/referrals',
      name: 'referrals',
      component: ReferralsView,
      meta: { title: 'Referral' }
    }
  ]
})

export default router
