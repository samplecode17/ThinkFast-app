import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router';
import store from './store';
import 'flowbite';
import 'flowbite-datepicker'
import apiClient from './services/appClient';



const app = createApp(App);



apiClient.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch('logOut');
      return router.push('/login')
    }
  }
});

app.use(router);
app.use(store);
app.mount("#app");