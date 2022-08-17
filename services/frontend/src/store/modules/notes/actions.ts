import { ActionTree, ActionContext } from 'vuex';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../../index';

import { State } from './state';
import { Mutations } from './mutations';
import { NotesMutationTypes } from './mutation-types';
import { NotesActionTypes } from './action-types';

import axios from 'axios';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [NotesActionTypes.FETCH_NOTES]({ commit }: AugmentedActionContext): Promise<boolean>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [NotesActionTypes.FETCH_NOTES]({ commit }) {
    return new Promise(() => {
      setTimeout(() => {
        console.debug('FETCH_NOTES');
        // commit(NotesMutationTypes.SET_DATA, data);
        return true;
      }, 500);
    });
  },
  async [NotesActionTypes.CREATE_NOTE]({ dispatch }) {
    return new Promise(() => {
      setTimeout(() => {
        console.debug('CREATE_NOTE');
        // axios.post();
        dispatch(NotesActionTypes.GET_NOTES)
        return true;
      }, 500);
    });
  },
  async [NotesActionTypes.GET_NOTES]({ commit }) {
    return new Promise(() => {
      setTimeout(() => {
        console.debug('GET_NOTES');
        // axios.post();
        // commit(NotesMutationTypes.SET_DATA, data);
        return true;
      }, 500);
    });
  },
};
