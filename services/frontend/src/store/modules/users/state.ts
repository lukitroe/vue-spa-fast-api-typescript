import { User } from '../../../@types';

export type State = {
  data: User | null;
}

export const state: State = {
  data: null
};
