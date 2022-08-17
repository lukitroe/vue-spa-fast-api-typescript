import { GetterTree } from 'vuex';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../../index';

import { NotesDocuments} from '../../../@types';

import { State } from './state';

export type Getters = {
  getDocuments(state: State): NotesDocuments | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getDocuments: (state) => state.data,
};
