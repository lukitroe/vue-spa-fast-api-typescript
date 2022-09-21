import { NotesDocuments, NoteDocument } from '../../../@types';

export type State = {
  data: NotesDocuments | null;
  note: NoteDocument | null;
}

export const state: State = {
  data: null,
  note: null
};
