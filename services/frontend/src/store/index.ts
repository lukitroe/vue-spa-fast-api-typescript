import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// TODO: How to surpass cyclical dependency linting errors cleanly?
// eslint-disable-next-line import/no-cycle
import { store as notes, NotesStore, State as NotesState } from './modules/notes/index';
// eslint-disable-next-line import/no-cycle
import { store as users, UsersStore, State as UsersState } from './modules/users/index';

export type RootState = {
  notes: NotesState;
  users: UsersState;
};

export type Store = NotesStore<Pick<RootState, 'notes'>>
 & UsersStore<Pick<RootState, 'users'>>;

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

// Plug in session storage based persistence
plugins.push(createPersistedState({ storage: window.sessionStorage }));

export const store = createStore({
  plugins,
  modules: {
    notes,
    users
  },
});

export function useStore(): Store {
  return store as Store;
}
