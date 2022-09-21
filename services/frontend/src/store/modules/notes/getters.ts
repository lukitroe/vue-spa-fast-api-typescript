import { GetterTree } from 'vuex';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../../index';

import { NotesDocuments, NoteDocument} from '../../../@types';

import { State } from './state';

export type Getters = {
  getDocuments(state: State): NotesDocuments | null;
  getNote(state: State): NoteDocument | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getDocuments: (state) => state.data,
  getNote: (state) => state.note,
};
