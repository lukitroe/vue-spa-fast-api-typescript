import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {useRouter} from './router/index';
import { useStore } from './store/index';
import {UsersActionTypes} from './store/modules/users/action-types';
import App from './App.vue';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/';  // the FastAPI backend

const store = useStore();
const router = useRouter();

// NEW
axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch(UsersActionTypes.LOGOUT);
      return router.push('/login')
    }
  }
});

createApp(App).use(store).use(router).mount('#app');