<template>
  <section>
    <h1>Edit note</h1>
    <hr /><br />

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input type="text" name="title" v-model="refTitle" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content:</label>
        <textarea name="content" v-model="refContent" class="form-control"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed, Ref, ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store/index';
import { useRouter } from '../router/index';
import { NotesActionTypes } from '../store/modules/notes/action-types';
import { NoteDocument, User } from '../@types';

export default defineComponent({
  name: 'EditNote',
  setup() {
    const store = useStore();
    const router = useRouter();

    const currRoute = useRoute();
    const noteId: string = currRoute.params.id as string;

    const note: ComputedRef<NoteDocument | null> = computed(() => store.getters.getNote);
      
    const refTitle:Ref<string> = ref((note.value)?.title);
    const refContent:Ref<string> = ref((note.value)?.content);

    onMounted(async () => {
      await store.dispatch(NotesActionTypes.VIEW_NOTE, noteId);
    });

    const submit = async () => {
      try {
        await store.dispatch(NotesActionTypes.UPDATE_NOTE, {id: noteId, title: refTitle.value, content: refContent.value})
      } catch (err) {
        console.log("err: " + JSON.stringify(err));
      }
      router.push({ name: 'Note', params: { id: noteId } });
    }

    return {
      submit,
      refTitle,
      refContent
    }
  }
});
</script>