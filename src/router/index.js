import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
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
  ]


const router = createRouter({
    history:createWebHistory(),
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