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

<script lang="ts">
import { ref, defineComponent  } from 'vue'
import { useStore } from '../store/index';
import { useRouter } from '../router/index';
import { UsersActionTypes } from '../store/modules/users/action-types';

export default defineComponent({
  name: 'Login',
  setup() {

    const store = useStore();
    const router = useRouter();

    const username = ref('');
    const password = ref('');

    const submit = async () => {
      const UserLoginData = new FormData();
      UserLoginData.append('username', username.value);
      UserLoginData.append('password', password.value);
      try {
        await store.dispatch(UsersActionTypes.LOGIN, UserLoginData);
      } catch (error) {
        console.error('error in login', error);
      }
      router.push({ name: 'Dashboard' });
    }

    return { 
      submit, 
      username, 
      password 
    };
  }
});

</script>