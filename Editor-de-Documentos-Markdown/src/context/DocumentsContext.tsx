// src/context/DocumentsContext.tsx
'use client'; // Necessário no Next.js App Router para usar Hooks e Context (componente cliente)

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { IDocument, IUpdatePayload } from '../types/IDocument';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';


interface IDocumentsContext {
  documents: IDocument[];
  selectedDocument: IDocument | null;
  selectDocument: (id: string) => void;
  createDocument: () => string; // Retorna o ID do novo documento
  updateDocument: (id: string, payload: IUpdatePayload) => void;
  deleteDocument: (id: string) => void;
}

const DocumentsContext = createContext<IDocumentsContext | undefined>(undefined);

// Valor inicial para um novo documento
const DEFAULT_DOCUMENT: Omit<IDocument, 'id'> = {
  title: "Documento Sem Título",
  content: "",  
  updatedAt: new Date().toISOString(),
};

// 2. O Provider
export const DocumentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use o useLocalStorage para persistir a lista de documentos
  const [documents, setDocuments] = useLocalStorage<IDocument[]>('markdown_docs', []);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);

  // Seleciona um documento da lista
  const selectDocument = useCallback((id: string) => {
    const doc = documents.find(d => d.id === id) || null;
    setSelectedDocument(doc);
  }, [documents]);

  // Cria um novo documento
  const createDocument = useCallback(() => {
    const newId = uuidv4();
    const newDoc: IDocument = {
      id: newId,
      ...DEFAULT_DOCUMENT,
      updatedAt: new Date().toISOString(),
    };
    
    // Salva na lista e no localStorage (via useLocalStorage)
    setDocuments(prevDocs => [...prevDocs, newDoc]);
    
    // Seleciona o novo documento automaticamente
    setSelectedDocument(newDoc); 
    
    return newId;
  }, [setDocuments]);

  // Atualiza título ou conteúdo
  const updateDocument = useCallback((id: string, payload: IUpdatePayload) => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id === id) {
          const updatedDoc = {
            ...doc,
            ...payload,
            updatedAt: new Date().toISOString(), // Sempre atualiza a data
          };

          // Se o documento atualizado for o selecionado, atualize o estado local
          if (selectedDocument?.id === id) {
             setSelectedDocument(updatedDoc);
          }
          return updatedDoc;
        }
        return doc;
      })
    );
  }, [setDocuments, selectedDocument?.id]);

  // Exclui um documento
  const deleteDocument = useCallback((id: string) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
    
    // Se o documento excluído for o selecionado, limpa a seleção
    if (selectedDocument?.id === id) {
      setSelectedDocument(null);
    }
  }, [setDocuments, selectedDocument?.id]);


  const value: IDocumentsContext = {
    documents,
    selectedDocument,
    selectDocument,
    createDocument,
    updateDocument,
    deleteDocument,
  };

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
};

// 3. Custom Hook para Consumo
export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
};