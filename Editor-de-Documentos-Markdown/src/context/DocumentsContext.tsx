'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { IDocument, IUpdatePayload } from '../types/IDocument';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

interface IDocumentsContext {
  documents: IDocument[];
  selectedDocument: IDocument | null;
  selectDocument: (id: string) => void;
  createDocument: () => string;
  updateDocument: (id: string, payload: IUpdatePayload) => void;
  deleteDocument: (id: string) => void;
}

const DocumentsContext = createContext<IDocumentsContext | undefined>(undefined);

const DEFAULT_DOCUMENT: Omit<IDocument, 'id'> = {
  title: "Documento Sem Título",
  content: "",  
  updatedAt: new Date().toISOString(),
};

export const DocumentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useLocalStorage<IDocument[]>('markdown_docs', []);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);

  const selectDocument = useCallback((id: string) => {
    const doc = documents.find(d => d.id === id) || null;
    setSelectedDocument(doc);
  }, [documents]);

  const createDocument = useCallback(() => {
    const newId = uuidv4();
    const newDoc: IDocument = {
      id: newId,
      ...DEFAULT_DOCUMENT,
      updatedAt: new Date().toISOString(),
    };
    
    setDocuments(prevDocs => [...prevDocs, newDoc]);
    setSelectedDocument(newDoc); 
    
    return newId;
  }, [setDocuments]);

  const updateDocument = useCallback((id: string, payload: IUpdatePayload) => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id === id) {
          const updatedDoc = {
            ...doc,
            ...payload,
            updatedAt: new Date().toISOString(),
          };

          if (selectedDocument?.id === id) {
             setSelectedDocument(updatedDoc);
          }
          return updatedDoc;
        }
        return doc;
      })
    );
  }, [setDocuments, selectedDocument?.id]);

  const deleteDocument = useCallback((id: string) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
    
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

export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
};