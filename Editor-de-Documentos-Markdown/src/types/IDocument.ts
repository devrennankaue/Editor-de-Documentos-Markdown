export interface IDocument {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export type IUpdatePayload = Partial<Omit<IDocument, 'id'>>;