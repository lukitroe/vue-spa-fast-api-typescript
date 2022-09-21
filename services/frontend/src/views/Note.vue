<template>
  <div v-if="note">
    <p><strong>Title:</strong> {{  note.title  }}</p>
    <p><strong>Content:</strong> {{  note.content  }}</p>
    <p><strong>Author:</strong> {{  note.author.username  }}</p>

    <!-- <div v-if="user.id === note.author.id">
      <p>
        <router-link :to="{ name: 'EditNote', params: { id: note.id } }" class="btn btn-primary">Edit</router-link>
      </p>-->
      <!-- <p><button @click="removeNote()" class="btn btn-secondary">Delete</button></p> -->
    <!-- </div>  -->
  </div>
</template>


<script lang="ts">
import { ref, defineComponent, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store/index';
import { useRouter } from '../router/index';
import { NotesActionTypes } from '../store/modules/notes/action-types';

export default defineComponent({
  name: 'Note',
  setup() {
    const store = useStore();

    const currRoute = useRoute();

    const id:string = currRoute.params.id as string;

    const note = computed(() => store.getters.getNote);

    onMounted(async () => {
      await store.dispatch(NotesActionTypes.VIEW_NOTE, id);
    });

    return {
      note
    };
  },
  // computed: {
  //   ...mapGetters({ note: 'stateNote', user: 'stateUser' }),
  // },
  // methods: {
  //   ...mapActions(['viewNote', 'deleteNote']),
  //   async removeNote() {
  //     try {
  //       await this.deleteNote(this.id);
  //       this.$router.push('/dashboard');
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // },
});
</script>