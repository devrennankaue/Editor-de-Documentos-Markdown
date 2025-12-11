// src/components/TitleEditor.tsx 
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TextField } from '@mui/material';
import { useDocuments } from '@/context/DocumentsContext'; 

interface TitleEditorProps {
    documentId: string;
    initialTitle: string;
}

export const TitleEditor = ({ documentId, initialTitle }: TitleEditorProps) => { 
    const [title, setTitle] = useState(initialTitle);
    const { updateDocument } = useDocuments();
    
    // Usa useCallback para salvar o título no Contexto
    const saveTitle = useCallback((newTitle: string) => {
        let finalTitle = newTitle.trim();
        
        // Validação: Garante título padrão se estiver vazio
        if (finalTitle === "") {
            finalTitle = "Documento Sem Título";
        }
        
        updateDocument(documentId, { title: finalTitle });
        
        // Atualiza o estado local para refletir o título padrão se ele foi usado
        setTitle(finalTitle); 
    }, [documentId, updateDocument]);
    
    useEffect(() => {
        // Garante que o estado local é sincronizado quando o documento muda
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
        <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            placeholder="Documento Sem Título"
            variant="standard"
            sx={{
                '& .MuiInputBase-input': {
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    py: 1,
                },
                '& .MuiInput-underline:before': {
                    borderBottomColor: 'divider',
                },
                '& .MuiInput-underline:hover:before': {
                    borderBottomColor: 'primary.main',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'primary.main',
                },
            }}
        />
    );
};