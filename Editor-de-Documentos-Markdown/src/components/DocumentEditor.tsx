// src/components/DocumentEditor.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef, ImgHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDocuments } from '@/context/DocumentsContext'; 
import { Toolbar } from './Toolbar';
import { useDebounce } from '../hooks/useDebouce';

interface DocumentEditorProps {
    documentId: string;
    initialContent: string;
}

const SafeImage: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, ...props }) => {
    if (!src) {
      return (
        <span className="text-red-500 dark:text-red-400">
          [Erro de Imagem: URL ausente para "{alt}"]
        </span>
      );
    }
    return <img src={src} alt={alt} {...props} />;
};


const DocumentEditor = ({ documentId, initialContent }: DocumentEditorProps) => { 
    const [markdownInput, setMarkdownInput] = useState(initialContent);
    const { updateDocument } = useDocuments();
    const textareaRef = useRef<HTMLTextAreaElement>(null); 
    
    const debouncedContent = useDebounce(markdownInput, 800); 

    const saveContent = useCallback((newContent: string) => {
        updateDocument(documentId, { content: newContent });
    }, [documentId, updateDocument]);

    useEffect(() => {
        if (debouncedContent !== initialContent) { 
            saveContent(debouncedContent); 
        }
    }, [debouncedContent, saveContent, initialContent]);

    useEffect(() => {
        setMarkdownInput(initialContent);
    }, [initialContent]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdownInput(e.target.value); 
    };
    
    const insertMarkdown = useCallback((prefix: string, suffix: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = textarea.value;
        const selectedText = currentText.substring(start, end);

        let finalPrefix = prefix;

        if (prefix.includes('#') || prefix.includes('-') || prefix.includes('`')) {
             if (start > 0 && currentText[start - 1] !== '\n') {
                 finalPrefix = '\n' + prefix;
             }
        }
        
        const newText = currentText.substring(0, start) + finalPrefix + selectedText + suffix + currentText.substring(end);
        
        setMarkdownInput(newText);
        
        requestAnimationFrame(() => {
            textarea.focus();
            const prefixLength = finalPrefix.length; 
            const newCursorPos = start + prefixLength;
          
            if (selectedText.length === 0) {
                textarea.selectionStart = newCursorPos;
                textarea.selectionEnd = newCursorPos;
            } else {
                textarea.selectionStart = newCursorPos;
                textarea.selectionEnd = newCursorPos + selectedText.length;
            }
        });
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-full border border-gray-300 dark:border-gray-600 rounded overflow-hidden shadow-lg">
            
            <div className='flex flex-col h-full bg-white dark:bg-gray-800'>
                
                <h2 className="text-sm font-medium p-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 uppercase tracking-widest flex-shrink-0">
                    Editor Markdown
                </h2>
                
                <Toolbar 
                    insertMarkdown={insertMarkdown} 
                    className="bg-gray-50 dark:bg-gray-800 p-2 flex-shrink-0 border-b border-gray-200 dark:border-gray-700" 
                /> 
                
                <textarea
                    ref={textareaRef} 
                    value={markdownInput} 
                    onChange={handleChange} 
                    placeholder="Comece a escrever em Markdown..."
                    className="w-full p-4 resize-none flex-grow overflow-y-auto font-mono text-base
                                 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 
                                 focus:outline-none focus:ring-0 transition-colors border-0"
                />
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 h-full border-l border-gray-300 dark:border-gray-600">
                
                <h2 className="text-sm font-medium p-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 uppercase tracking-widest flex-shrink-0">
                    Preview
                </h2>

                <div className="overflow-y-auto h-full">
                    <div className="prose max-w-none dark:prose-invert p-4"> 
                        <ReactMarkdown 
                            components={{ img: SafeImage }}
                        >
                            {markdownInput}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentEditor;