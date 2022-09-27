<template>
  <div v-if="note">
    <p><strong>Title:</strong> {{  note.title  }}</p>
    <p><strong>Content:</strong> {{  note.content  }}</p>
    <p><strong>Author:</strong> {{  note.author.full_name  }}</p>

    <div v-if="user.id === note.author.id">
      <p>
        <router-link :to="{ name: 'EditNote', params: { id: note.id } }" class="btn btn-primary">Edit</router-link>
      </p>
      <p><button @click="removeNote()" class="btn btn-secondary">Delete</button></p> -->
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, computed, ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store/index';
import { useRouter } from '../router/index';
import { NotesActionTypes } from '../store/modules/notes/action-types';
import { NoteDocument, User } from '../@types';

export default defineComponent({
  name: 'Note',
  setup() {
    const store = useStore();
    const router = useRouter();

    const currRoute = useRoute();

    const noteId: string = currRoute.params.id as string;

    const note: ComputedRef<NoteDocument | null> = computed(() => store.getters.getNote);

    const user: ComputedRef<User> = computed(() => store.getters.stateUser);

    onMounted(async () => {
      await store.dispatch(NotesActionTypes.VIEW_NOTE, noteId);
    });

    const removeNote = async () => {
      try {
        // console.log("removeNote 1");
        await store.dispatch(NotesActionTypes.DELETE_NOTE, noteId);
        // console.log("removeNote 2");
      } catch (err) {
        console.log("err: " + JSON.stringify(err));
      }
      // console.log("removeNote 3");
      router.push({ name: 'Dashboard' });
      // console.log("removeNote 4");
    }

    return {
      removeNote,
      note,
      user
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