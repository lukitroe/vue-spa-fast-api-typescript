<template>
    <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input type="text" name="username" v-model="username" class="form-control" />
        <div>Username: {{ username }}</div>
    </div>
    <div class="mb-3">
        <label for="full_name" class="form-label">Full Name:</label>
        <input type="text" name="full_name" v-model="full_name" class="form-control" />
        <div>full_name: {{ full_name }}</div>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" name="password" v-model="password" class="form-control" />
        <div>password: {{ password }}</div>
    </div>
    <button type="submit" class="btn btn-primary" @click="submit">Register</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../store/index';
import router from '../router';
import { UsersActionTypes } from '../store/modules/users/action-types';

const store = useStore();

const username = ref('');
const full_name = ref('');
const password = ref('');

async function submit() {
    try {
        await store.dispatch(UsersActionTypes.REGISTER, {
            "username": username.value,
            "full_name": full_name.value,
            "password": password.value
        });
        router.push('/dashboard');
    } catch (error) {
        console.error('fetchDocuments', error);
    }
}

</script>