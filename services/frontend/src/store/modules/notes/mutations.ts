import { MutationTree } from 'vuex';

import { NotesDocuments } from '../../../@types';

import { State } from './state';
import { NotesMutationTypes } from './mutation-types';

export type Mutations<S = State> = {
  [NotesMutationTypes.SET_DATA](state: S, payload: NotesDocuments): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [NotesMutationTypes.SET_DATA](state: State, documents: NotesDocuments) {
    state.data = documents;
  },
};
