// src/components/TitleEditor.tsx 
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useDocuments } from '@/context/DocumentsContext'; 

interface TitleEditorProps {
    documentId: string;
    initialTitle: string;
}

// Removendo React.FC para garantir compatibilidade
export const TitleEditor = ({ documentId, initialTitle }: TitleEditorProps) => { 
    const [title, setTitle] = useState(initialTitle);
    const { updateDocument } = useDocuments();
    
    // Usa useCallback para salvar o título no Contexto
    const saveTitle = useCallback((newTitle: string) => {
        if (newTitle.trim() === "") {
            newTitle = "Documento Sem Título";
        }
        updateDocument(documentId, { title: newTitle });
    }, [documentId, updateDocument]);
    
    useEffect(() => {
        setTitle(initialTitle);
    }, [initialTitle]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        saveTitle(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            // Estilização moderna e responsiva ao tema
            className="w-full text-3xl font-bold bg-transparent border-none p-0 focus:outline-none 
                       text-gray-900 dark:text-gray-100 placeholder-gray-400 mb-6"
            placeholder="Documento Sem Título"
        />
    );
};