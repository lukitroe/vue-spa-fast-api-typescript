<template>
    <form @submit.prevent="submit">
        <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input type="text" name="username" v-model="username" class="form-control" />
        </div>
        <div class="mb-3">
            <label for="full_name" class="form-label">Full Name:</label>
            <input type="text" name="full_name" v-model="full_name" class="form-control" />
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input type="password" name="password" v-model="password" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useStore } from '../store/index';
import { useRouter } from '../router/index';
import { UsersActionTypes } from '../store/modules/users/action-types';

export default defineComponent({
    name: 'Register',
    setup() {
        const store = useStore();

        const router = useRouter();

        const username = ref('');
        const full_name = ref('');
        const password = ref('');

        const submit = async () => {
            try {
                await store.dispatch(UsersActionTypes.REGISTER, {
                    "username": username.value,
                    "full_name": full_name.value,
                    "password": password.value
                })
            } catch (err) {
                console.log("err: " + JSON.stringify(err));
            }
            router.push({ name: 'Dashboard' });
        }

        return {
            submit,
            username,
            full_name,
            password
        };
    }
});
</script>