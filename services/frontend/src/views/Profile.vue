<template>
  <section>
    <h1>Your Profile</h1>
    <hr /><br />
    <div>
      {{ isAuth }}
    </div>
    <div>
      <p><strong>Full Name:</strong> <span>{{ userObj?.full_name }}</span></p>
      <p><strong>Username:</strong> <span>{{ userObj?.username }}</span></p>
      <p><button @click="deleteAccount" class="btn btn-primary">Delete Account</button></p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, ComputedRef } from "vue";
import { useStore } from '../store/index';
import { User } from '../@types';
import router from '../router';
import { UsersActionTypes } from '../store/modules/users/action-types';

const store = useStore();

const isAuth = computed(() => store.getters.isAuthenticated);

const userObj = computed(() => store.getters.stateUser);

async function deleteAccount() {
  try {
    await store.dispatch(UsersActionTypes.DELETEUSER, { "username": userObj.value?.username })
    router.push('/');
  } catch (error) {
    console.error(error);
  }
}
</script>