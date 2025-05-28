import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/authentification/Login.vue';
import Register from '@/views/authentification/Register.vue';
import CreateGame from '@/views/gamesCreator/CreateGame.vue';
import store from '@/store';

const routes = [
    {
      path: '/',
      name: "Home",
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
      path: '/games-creator/create',
      name: 'Creating games',
      component: CreateGame,
    },
  ]


const router = createRouter({
    history:createWebHistory("./"
    ),
    routes,
});


router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});




export default router