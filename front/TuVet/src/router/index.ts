import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CalendarView from '../views/CalendarView.vue'
import VeterinarioView from '../views/VeterinarioView.vue'
import animalesView from '@/views/animalesView.vue'
import CitasView from '@/views/CitasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
    },
    {
      path: '/veterinarios',
      name: 'veterinarios',
      component: VeterinarioView,
    },
    {
      path: '/animales',
      name: 'animales',
      component: animalesView,
    },
    {
      path: '/citas',
      name: 'citas',
      component: CitasView,
    }
  ],
})

export default router
