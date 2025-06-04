import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/authentification/Login.vue'
import Register from '@/views/authentification/Register.vue'
import CreateGame from '@/views/Creator/CreateGame.vue'
import store from '@/store'
import CreateChallengeQuiz from '@/views/Creator/CreateChallengeQuiz.vue'
import ListMyGames from '@/views/Creator/ListMyGames.vue'
import ListAllGames from '@/views/Games/ListAllGames.vue'


import GameSection from '@/views/Games/GameSection.vue'
import GameChallengesList from '@/views/Creator/GameChallengesList.vue'

// the routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  //Creator section
  {
    path: '/creator/games/create',
    name: 'Creating games',
    component: CreateGame,
    meta: { requiresAuth: true }, // Route requires authentication
  },
  {
    path: '/creator/games/:game_id/challenges/create',
    name: 'Creating challenge quiz',
    component: CreateChallengeQuiz,
  },
  {
    path: '/creator/games',
    name: 'List of all my games',
    component: ListMyGames,
    meta: { requiresAuth: true },
  },
  {
    path: '/games/list/All',
    name: 'All games list',
    component: ListAllGames,
    meta: { requiresAuth: true },
  },
  {
    path: '/games/play/:game_id',
    name: 'games',
    component: GameSection,
  },
  {
    path: '/test/:game_id',
    name: 'test',
    component: GameChallengesList,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard to check authentication before each route change
router.beforeEach(async (to, _from, next) => {
  const isAuthenticated = store.getters.isAuthenticated

  // If not authenticated but token exists, try to fetch user data
  if (!isAuthenticated && localStorage.getItem('token')) {
    try {
      await store.dispatch('Me') // Fetch current user info from API
    } catch (e) {
      console.warn('Failed to fetch user info with Me():', e)
    }
  }

  // Update authentication status after possible user fetch
  const updatedAuth = store.getters.isAuthenticated

  // If route requires auth and user is not authenticated, redirect to login
  if (to.matched.some(record => record.meta.requiresAuth) && !updatedAuth) {
    return next('/login')
  }

  // Prevent authenticated users from visiting login or register pages
  if ((to.path === '/login' || to.path === '/register') && updatedAuth) {
    return next('/')
  }
  next()
})

export default router
