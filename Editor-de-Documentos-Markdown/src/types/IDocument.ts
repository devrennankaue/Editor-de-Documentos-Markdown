// src/types/IDocument.ts
export interface IDocument {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

// Tipo para o payload de atualização, permitindo que as propriedades sejam opcionais (Partial)
// e excluindo 'id', pois não queremos mudar o ID de um documento existente.
export type IUpdatePayload = Partial<Omit<IDocument, 'id'>>;

// Tipo para as funções da Toolbar (opcional, mas recomendado para tipagem estrita)
export type MarkdownFormat = 'bold' | 'italic' | 'heading' | 'list' | 'code';