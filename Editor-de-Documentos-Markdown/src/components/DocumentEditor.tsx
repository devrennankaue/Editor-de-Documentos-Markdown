// src/components/DocumentEditor.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef, ImgHTMLAttributes } from 'react'; // ImgHTMLAttributes para o SafeImage
import ReactMarkdown from 'react-markdown';
import { useDocuments } from '@/context/DocumentsContext'; 
import { Toolbar } from './Toolbar';
import { useDebounce } from '../hooks/useDebouce'; // Mantendo o caminho relativo mais estável

interface DocumentEditorProps {
  documentId: string;
  initialContent: string;
}

// 💡 NOVO COMPONENTE (SafeImage): Previne o erro de <img src=""> vazio
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
  }, [debouncedContent, saveContent]); 

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

    const newText = currentText.substring(0, start) + prefix + currentText.substring(start, end) + suffix + currentText.substring(end);
    setMarkdownInput(newText);
    
    requestAnimationFrame(() => {
      textarea.focus();
    });
  }, []);


  return (
    // 💡 LAYOUT SPLIT-VIEW (2 COLUNAS)
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      
      {/* COLUNA 1: EDITOR */}
      <div className='flex flex-col h-full'> 
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Editor Markdown</h2>
        
        {/* 💡 TOOLBAR RESTAURADA */}
        <Toolbar 
          insertMarkdown={insertMarkdown} 
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-t-lg shadow-md mb-2" 
        /> 
        
        {/* 💡 TEXTAREA RESTAURADA */}
        <textarea
          ref={textareaRef} 
          value={markdownInput} 
          onChange={handleChange} 
          placeholder="Comece a escrever em Markdown..."
          className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-b resize-none flex-grow 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      {/* COLUNA 2: PREVIEW */}
      <div className="border border-gray-300 dark:border-gray-600 p-4 rounded bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Preview</h2>
        <div className="prose max-w-none dark:prose-invert"> 
          {/* 💡 REACTMARKDOWN RESTAURADO COM CORREÇÃO DE IMAGEM */}
          <ReactMarkdown 
             components={{ img: SafeImage }}
          >
            {markdownInput}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;