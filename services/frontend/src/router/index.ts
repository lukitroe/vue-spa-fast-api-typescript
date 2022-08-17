import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { useStore } from '../store/index';

import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/Profile.vue';
import Note from '../views/Note.vue';
import EditNote from '../views/EditNote.vue';

const store = useStore();

interface RoutesType {
  path: string;
  name: string;
  component: any;
  meta?: {
    index?: number;
    keepAlive?: boolean;
    requiresAuth?: boolean;
  };
  children?: RoutesType[];
}


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: "Home",
    component: Home
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
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {requiresAuth: true},
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {requiresAuth: true},
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: Note,
    meta: {requiresAuth: true}
  },
  {
    path: '/note/:id',
    name: 'EditNote',
    component: EditNote,
    meta: {requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// NEW
router.beforeEach((to, from, next) => {
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

export default router;