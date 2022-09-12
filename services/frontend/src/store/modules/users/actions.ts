import {
  ActionTree, ActionContext,
  CommitOptions,
  DispatchOptions,
} from 'vuex';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../../index';

import { State } from './state';
import { Mutations } from './mutations';
import { UsersMutationTypes } from './mutation-types';
import { UsersActionTypes } from './action-types';
import { User } from '../../../@types';

import axios from 'axios';

type AugmentedActionContext = Omit<ActionContext<State, RootState>, "commit" | "dispatch">
  & {
    commit<K extends keyof Mutations>(
      key: K,
      payload?: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
  } & {
    dispatch<K extends keyof Actions>(
      key: K,
      payload?: Parameters<Actions[K]>[1]
    ): ReturnType<Actions[K]>;
  }

export interface Actions {
  [UsersActionTypes.REGISTER]({ dispatch }: AugmentedActionContext, payload: any): void,
  [UsersActionTypes.LOGIN]({ dispatch }: AugmentedActionContext, payload: any): void,
  [UsersActionTypes.VIEWME]({ commit }: AugmentedActionContext): void,
  [UsersActionTypes.LOGOUT]({ commit }: AugmentedActionContext): void,
  [UsersActionTypes.DELETEUSER]({ commit }: AugmentedActionContext, payload: any): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [UsersActionTypes.REGISTER]({ dispatch }: AugmentedActionContext, payload: any) {

    // console.debug('REGISTER payload (1): ' + JSON.stringify(payload));

    await axios.post('register', payload);
    // console.debug('REGISTER payload (2)');

    let Userdata = new FormData();
    Userdata.append('username', payload.username);
    Userdata.append('password', payload.password);

    await dispatch(UsersActionTypes.LOGIN, Userdata);

    // console.debug("REGISTER done");

  },
  async [UsersActionTypes.LOGIN]({ dispatch }: AugmentedActionContext, payload: any) {

    // console.debug('LOGIN payload: ' + JSON.stringify(payload));
    await axios.post('login', payload);
    // console.debug('LOGIN payload(2) ');
    await dispatch(UsersActionTypes.VIEWME);
    // console.debug('LOGIN payload(3) ');
  },
  async [UsersActionTypes.VIEWME]({ commit }) {

    // console.debug('VIEWME');
    let data = await axios.get('users/whoami');
    // console.debug('VIEWME (2)');
    let viewedUser: User = { username: data.data.username, full_name: data.data.full_name };
    // console.debug('viewedUser: ' + JSON.stringify(viewedUser));
    await commit(UsersMutationTypes.SET_USER, viewedUser);
    // console.debug('VIEWME (3)');

  },
  async [UsersActionTypes.LOGOUT]({ commit }: AugmentedActionContext) {
    // console.debug('LOGOUT');
    await commit(UsersMutationTypes.SET_USER, null);
  },
  async [UsersActionTypes.DELETEUSER]({ commit }: AugmentedActionContext, payload: any) {
    // console.debug('DELETEUSER');
    await axios.delete('user/${payload}');
    await commit(UsersMutationTypes.SET_USER);
  }
}
