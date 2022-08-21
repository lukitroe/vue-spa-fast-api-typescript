<template>
  <section>
    <p>This site is built with FastAPI and Vue.</p>

    <div v-if="isLoggedIn" id="logout">
      <p id="logout">Click <a href="/dashboard">here</a> to view all notes.</p>
    </div>
    <p v-else>
      <span><router-link to="/register">Register</router-link></span>
      <span> or </span>
      <span><router-link to="/login">Log In</router-link></span>
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from '../store/index';

const store = useStore();

const isLoggedIn = computed(() => store.getters.isAuthenticated);

</script>