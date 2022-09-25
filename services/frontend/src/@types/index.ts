declare type NotesDetails = {
  id: number,
  title:string,
  content:string,
  creator:string,
  created_at: string,
  modified_at: string
};

export type NotesDocuments = {
  readonly notes: Array<NotesDetails>;
};

export type NoteDocument = {
  readonly note: NotesDetails;
}


export type User = {
    id: number,
    username: string,
    full_name: string
} | null;
