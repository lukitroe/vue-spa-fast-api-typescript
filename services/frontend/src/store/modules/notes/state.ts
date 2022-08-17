import { NotesDocuments } from '../../../@types';

export type State = {
  data: NotesDocuments | null;
}

export const state: State = {
  data: null
};
