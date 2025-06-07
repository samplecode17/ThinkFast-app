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
import EditChallengeQuiz from '@/views/Creator/EditChallengeQuiz.vue'
import EditGame from '@/views/Creator/EditGame.vue'
import UserSettings from '@/views/User/UserSettings.vue'
import UsersList from '@/views/Admin/UsersList.vue'
import CreateUser from '@/views/Admin/CreateUser.vue'

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
  {
    path: '/admin',
    name: 'Users administration',
    component: UsersList,
    // meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/users/create',
    name: 'Users administration create',
    component: CreateUser,
    // meta: { requiresAuth: true, requiresAdmin: true },
  },


  // Games (public and gameplay)
  {
    path: '/games/list/All',
    name: 'All games list',
    component: ListAllGames,
    meta: { requiresAuth: true },
  },
  {
    path: '/games/play/:game_id',
    name: 'Play the game',
    component: GameSection,
  },
  {
    path: '/user/settings',
    name: 'Settings',
    component: UserSettings,
  },
  {
    path: '/creator',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'games',
        name: 'List of all my games',
        component: ListMyGames,
      },
      {
        path: 'games/create',
        name: 'Creating games',
        component: CreateGame,
      },
      {
        path: 'games/edit/:game_id',
        name: 'Edit game',
        component: EditGame,
      },
      {
        path: 'game/:game_id',
        name: 'Game info and challenges',
        component: GameChallengesList,
      },
      {
        path: 'games/:game_id/challenges/create',
        name: 'Creating challenge quiz',
        component: CreateChallengeQuiz,
      },
      {
        path: 'games/:game_id/challenges/edit/:challenge_id',
        name: 'Edit challenge',
        component: EditChallengeQuiz,
      },
    ],
  },
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
  const isAdmin = store.getters.getIsAdmin

  // If route requires auth and user is not authenticated, redirect to login
  if (to.matched.some(record => record.meta.requiresAuth) && !updatedAuth) {
    return next('/login')
  }

  if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
    return next('/')
  }

  // Prevent authenticated users from visiting login or register pages
  if ((to.path === '/login' || to.path === '/register') && updatedAuth) {
    return next('/')
  }
  next()
})

export default router
