declare type NotesDetails = {};

export type NotesDocuments = {
  readonly notes: Array<NotesDetails> | null;
};


export type User = {
    username: string,
    full_name: string
} | null;
