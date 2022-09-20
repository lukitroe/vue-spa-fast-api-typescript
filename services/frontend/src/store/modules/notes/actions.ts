import { ActionTree, ActionContext } from 'vuex';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../../index';

import { State } from './state';
import { Mutations } from './mutations';
import { NotesMutationTypes } from './mutation-types';
import { NotesActionTypes } from './action-types';

import axios from 'axios';

type AugmentedActionContext = Omit<ActionContext<State, RootState>, "commit" | "dispatch">
& {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1]
  ): ReturnType<Actions[K]>;
}

export interface Actions {
  [NotesActionTypes.FETCH_NOTES]({ commit }: AugmentedActionContext): void;
  [NotesActionTypes.CREATE_NOTE]({ dispatch }: AugmentedActionContext, payload:any): void;
  [NotesActionTypes.GET_NOTES]({ commit }: AugmentedActionContext): void;
  [NotesActionTypes.VIEW_NOTE]({ commit }: AugmentedActionContext): void;
  [NotesActionTypes.UPDATE_NOTE]({ commit }: AugmentedActionContext): void;
  [NotesActionTypes.DELETE_NOTE]({ commit }: AugmentedActionContext): void;
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
  async [NotesActionTypes.CREATE_NOTE]({ dispatch }, payload: any) {
    
        console.debug('CREATE_NOTE');
        let {data} = await axios.post('notes', payload);
        await dispatch(NotesActionTypes.GET_NOTES);
  },
  async [NotesActionTypes.GET_NOTES]({ commit }) {
    
        console.debug('GET_NOTES');
        let {data} = await axios.get('notes');
        await commit(NotesMutationTypes.SET_DATA, data);

  },
  async [NotesActionTypes.VIEW_NOTE]({ commit }) {
    console.log("dummy VIEW_NOTE");
  },
  async [NotesActionTypes.UPDATE_NOTE]({ commit }) {
    console.log("dummy UPDATE_NOTE");
  },
  async [NotesActionTypes.DELETE_NOTE]({ commit }) {
    console.log("dummy DELETE_NOTE");
  }
};
