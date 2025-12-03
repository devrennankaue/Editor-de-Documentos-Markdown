// src/app/doc/[id]/page.tsx
'use client'; 

import { useDocuments } from '@/context/DocumentsContext'; // Use alias ou caminho relativo
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function DocumentEditorPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedDocument, selectDocument } = useDocuments();

  // Carrega o documento selecionado ao entrar na página
  useEffect(() => {
    if (id) {
        selectDocument(id);
    }
  }, [id, selectDocument]);

  if (!selectedDocument) {
    return <div className="p-8">Carregando documento...</div>;
  }
  
  // No futuro, aqui será o componente de edição:
  // return <DocumentEditor document={selectedDocument} />
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Editando: {selectedDocument.title}</h1>
      <p className="mt-4 p-4 bg-gray-100 rounded">
        Conteúdo: {selectedDocument.content || 'Documento vazio.'}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        ID: {selectedDocument.id} | Última Atualização: {new Date(selectedDocument.updatedAt).toLocaleTimeString()}
      </p>
      
      {/* Aqui você vai integrar o componente DocumentEditor */}
    </div>
  );
}