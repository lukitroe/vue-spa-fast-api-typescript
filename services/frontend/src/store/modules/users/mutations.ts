import { MutationTree } from 'vuex';

import { User } from '../../../@types';

import { State } from './state';
import { UsersMutationTypes } from './mutation-types';

// mutations type
export type Mutations<S = State> = {
  [UsersMutationTypes.SET_USER](state: S, payload: User): void;
}

// define mutation
export const mutations: MutationTree<State> & Mutations = {
  [UsersMutationTypes.SET_USER](state: State, user: User) {
    // console.debug("SET_USER: " + JSON.stringify(user));
    state.data = user;
  },
};
