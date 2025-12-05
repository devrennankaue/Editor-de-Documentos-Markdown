// src/components/DocumentEditor.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDocuments } from '@/context/DocumentsContext';
import { Toolbar } from './Toolbar';
import { useDebounce } from '@/hooks/useDebouce';
// 💡 CORREÇÃO DE CAMINHO: Deve ser 'hooks' fora de 'components'


interface DocumentEditorProps {
  documentId: string;
  initialContent: string;
}

// 💡 CORREÇÃO PRINCIPAL: Removendo o React.FC para resolver o erro de tipagem
export const DocumentEditor = ({ documentId, initialContent }: DocumentEditorProps) => { 
  const [markdownInput, setMarkdownInput] = useState(initialContent);
  const { updateDocument } = useDocuments();
  const textareaRef = useRef<HTMLTextAreaElement>(null); 
  
  // Autosave com Debounce
  const debouncedContent = useDebounce(markdownInput, 800); 

  const saveContent = useCallback((newContent: string) => {
    updateDocument(documentId, { content: newContent });
  }, [documentId, updateDocument]);

  useEffect(() => {
    if (debouncedContent !== initialContent) { 
      saveContent(debouncedContent); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent, saveContent]); 

  // Sincroniza estado inicial/navegação
  useEffect(() => {
    setMarkdownInput(initialContent);
  }, [initialContent]);

  // Função que faz o input ser controlado
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setMarkdownInput(newContent); 
  };
  
  const insertMarkdown = useCallback((prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;

    const textBefore = currentText.substring(0, start);
    const selectedText = currentText.substring(start, end);
    const textAfter = currentText.substring(end);

    const newText = `${textBefore}${prefix}${selectedText}${suffix}${textAfter}`;

    setMarkdownInput(newText);
    
    const newCursorPosition = start + prefix.length + selectedText.length;

    requestAnimationFrame(() => {
      if (textarea) {
        textarea.selectionStart = newCursorPosition;
        textarea.selectionEnd = newCursorPosition;
        textarea.focus();
      }
    });

  }, []);


  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className='flex flex-col h-full'> 
        <h2 className="text-lg font-semibold mb-2">Editor Markdown</h2>
        
        <Toolbar 
          insertMarkdown={insertMarkdown} 
          className="bg-gray-700 p-2 rounded-t-lg shadow-md mb-2" 
        /> 
        
        <textarea
          ref={textareaRef} 
          value={markdownInput} 
          onChange={handleChange} 
          placeholder="Comece a escrever em Markdown..."
          className="w-full h-full p-4 border rounded-b resize-none flex-grow bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="border p-4 rounded bg-gray-800 text-gray-100 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div className="prose prose-invert max-w-none"> 
          <ReactMarkdown>
            {markdownInput}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};