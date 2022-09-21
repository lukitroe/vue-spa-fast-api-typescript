<template>
  <div>
    <section>
      <h1>Add new note</h1>
      <hr /><br />

      <form @submit.prevent="formSubmit">
        <div class="mb-3">
          <label for="title" class="form-label">Title:</label>
          <input type="text" name="title" v-model="_title" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">Content:</label>
          <textarea name="content" v-model="_content" class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </section>

    <br /><br />

    <section>
      <h1>Notes</h1>
      <hr /><br />

      <div v-if="notes!.length">
        <div v-for="note in notes" :key="note!.id" class="notes">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <ul>
                <li><strong>Note Title:</strong> {{  note!.title  }}</li>
                <li><strong>Author:</strong> {{  note!.author.username  }}</li>
                <li>
                  <router-link :to="{ name: 'Note', params: { id: note!.id } }">View</router-link>
                </li>
              </ul>
            </div>
          </div>
          <br />
        </div>
      </div>

      <div v-else>
        <p>Nothing to see. Check back later.</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed } from 'vue'
import { useStore } from '../store/index';
import { NotesActionTypes } from '../store/modules/notes/action-types';

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const store = useStore();

    const _title = ref('');
    const _content = ref('');

    const notes = computed(() => store.getters.getDocuments);

    onMounted(async () => {
      await store.dispatch(NotesActionTypes.GET_NOTES);
    })

    const formSubmit = async () => {
      try {
        await store.dispatch(NotesActionTypes.CREATE_NOTE, {title: _title.value, content: _content.value})
      } catch (err) {
        console.log("err: " + JSON.stringify(err));
      }
    }

    return {
      _title,
      _content,
      formSubmit,
      notes
    };
  },
});
</script>