declare type NotesDetails = {
  title:string,
  content:string,
  creator:string
};

export type NotesDocuments = {
  readonly notes: Array<NotesDetails> | null;
};


export type User = {
    username: string,
    full_name: string
} | null;
