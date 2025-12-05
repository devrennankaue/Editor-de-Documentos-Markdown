// src/app/doc/[id]/page.tsx
'use client'; 

import { useDocuments } from '@/context/DocumentsContext';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
// 💡 CORREÇÃO DE CAMINHO: Três níveis acima para chegar em 'src/components'
import { DocumentEditor } from '../../../components/DocumentEditor';
import { Header } from '../../../components/header';

export default function DocumentEditorPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedDocument, selectDocument } = useDocuments();

  useEffect(() => {
    if (!selectedDocument || selectedDocument.id !== id) {
      selectDocument(id);
    }
  }, [id, selectedDocument, selectDocument]); 

  if (!selectedDocument) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="p-8 flex-grow text-gray-500 dark:text-gray-400 flex items-center justify-center">
            Carregando documento ou documento não encontrado...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col"> 
      <Header />
      <main className="flex-grow flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Editando: {selectedDocument.title}
        </h1>
        
        <div className="flex-grow">
          <DocumentEditor 
            documentId={selectedDocument.id} 
            initialContent={selectedDocument.content} 
          />
        </div>
        
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          ID: {selectedDocument.id} | Última Atualização: {new Date(selectedDocument.updatedAt).toLocaleString()}
        </p>
      </main>
    </div>
  );
}