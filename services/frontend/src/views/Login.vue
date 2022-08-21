<template>
  <section>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input type="text" name="username" v-model="username" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" name="password" v-model="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../store/index';
import {useRouter} from '../router/index';
import { UsersActionTypes } from '../store/modules/users/action-types';

const store = useStore();
const router = useRouter();

const username = ref('');
const password = ref('');

async function submit() {
  try {
    await store.dispatch(UsersActionTypes.LOGIN, {
      "username": username.value,
      "password": password.value
    });
    router.push('/dashboard');
  } catch (error) {
    console.error('error in login', error);
  }
}
</script>