<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">Luksti's Try'n'error page</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul v-if="isLoggedIn" class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile">My Profile</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout">Log Out</a>
            </li>
          </ul>
          <ul v-else class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Log In</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store/index';
import {useRouter} from '../router/index';
import { UsersActionTypes } from '../store/modules/users/action-types';

const store = useStore();
const router = useRouter();

const isLoggedIn = computed(() => store.getters.isAuthenticated);

async function logout() {
  await store.dispatch(UsersActionTypes.LOGOUT)
  router.push({ name: 'login'});
}
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
