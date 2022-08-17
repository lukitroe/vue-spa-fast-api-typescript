import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import router from './router';
import { useStore } from './store/index';
import {UsersActionTypes} from './store/modules/users/action-types';
import App from './App.vue';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/';  // the FastAPI backend

const store = useStore();

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

// 5. Create and mount the root instance.
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.use(store)

app.mount('#app')

// Now the app has started!

// createApp(App).mount('#app')
