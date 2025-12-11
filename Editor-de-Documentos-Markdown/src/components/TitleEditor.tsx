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
    
    const saveTitle = useCallback((newTitle: string) => {
        let finalTitle = newTitle.trim();
        
        if (finalTitle === "") {
            finalTitle = "Documento Sem Título";
        }
        
        updateDocument(documentId, { title: finalTitle });
        setTitle(finalTitle); 
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