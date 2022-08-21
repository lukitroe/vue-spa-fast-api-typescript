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
  [UsersActionTypes.REGISTER]({ dispatch }: AugmentedActionContext, payload: any): Promise<boolean>,
  [UsersActionTypes.LOGIN]({ dispatch }: AugmentedActionContext, payload: any): Promise<boolean>,
  [UsersActionTypes.VIEWME]({ commit }: AugmentedActionContext): Promise<boolean>,
  [UsersActionTypes.LOGOUT]({ commit }: AugmentedActionContext): Promise<boolean>,
  [UsersActionTypes.DELETEUSER]({ commit }: AugmentedActionContext, payload: any): Promise<boolean>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [UsersActionTypes.REGISTER]({ dispatch }: AugmentedActionContext, payload: any) {
    return new Promise(() => {
      setTimeout(async () => {
        console.debug('REGISTER payload: ' + JSON.stringify(payload));
        await axios.post('register', payload).then((res) => {
          let Userdata = new FormData();
          Userdata.append('username', payload.username);
          Userdata.append('password', payload.password)
          dispatch(UsersActionTypes.LOGIN, Userdata);
        });
      }, 500);
      console.debug("REGISTER done");
    });
  },
  async [UsersActionTypes.LOGIN]({ dispatch }: AugmentedActionContext, payload: any) {
    return new Promise(() => {
      setTimeout(async () => {
        console.debug('LOGIN payload: ' + JSON.stringify(payload));
        await axios.post('login', payload).then((res) => {
          dispatch(UsersActionTypes.VIEWME);
        });
      }, 500);
      console.debug("LOGIN done");
    });
  },
  async [UsersActionTypes.VIEWME]({ commit }) {
    return new Promise(() => {
      setTimeout(async () => {
        console.debug('VIEWME');
        await axios.get('users/whoami').then((data) => {
          let viewedUser: User = {username: data.data.username, full_name: data.data.full_name};
          console.debug('viewedUser: ' + JSON.stringify(viewedUser));
          commit(UsersMutationTypes.SET_USER, viewedUser);

        });
      }, 500);
          console.debug('user set ');
    });
  },
  async [UsersActionTypes.LOGOUT]({ commit }: AugmentedActionContext) {
    return new Promise(() => {
      setTimeout(async () => {
        console.debug('LOGOUT');
        commit(UsersMutationTypes.SET_USER, null);
      }, 500);
    });
  },
  async [UsersActionTypes.DELETEUSER]({ commit }: AugmentedActionContext, payload: any) {
    return new Promise(() => {
      setTimeout(async () => {
        console.debug('DELETEUSER');
        await axios.delete('user/${payload}');
        commit(UsersMutationTypes.SET_USER);
      }, 500);
    });
  }
}
