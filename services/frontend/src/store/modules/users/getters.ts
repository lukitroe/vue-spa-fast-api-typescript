import { GetterTree } from 'vuex';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../../index';

import { User } from '../../../@types';

import { State } from './state';

export type Getters = {
  isAuthenticated(state: State): boolean | null;
  stateUser(state: State): User | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  isAuthenticated: (state) => !!state.data,
  stateUser: (state) => state.data,
};
