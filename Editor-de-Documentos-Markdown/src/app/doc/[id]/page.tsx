// src/app/doc/[id]/page.tsx
'use client'; 

import { useDocuments } from '@/context/DocumentsContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DocumentEditor from '../../../components/DocumentEditor'; // Caminho relativo
import  Header  from '../../../components/header'; // Caminho relativo
import { TitleEditor } from '../../../components/TitleEditor'; // Caminho relativo
import { Trash2 } from 'lucide-react'; // Ícone

export default function DocumentEditorPage() {
    const { id } = useParams<{ id: string }>();
    // 💡 CORREÇÃO 1: Importar deleteDocument e garantir o título via selectedDocument
    const { selectedDocument, selectDocument, deleteDocument } = useDocuments(); 
    const router = useRouter(); 

    useEffect(() => {
        if (!selectedDocument || selectedDocument.id !== id) {
            selectDocument(id);
        }
    }, [id, selectedDocument, selectDocument]); 

    const handleDelete = () => {
        // 💡 CORREÇÃO 2: Acessar o título do selectedDocument (se ele existir)
        const title = selectedDocument?.title || "este documento";
        
        if (confirm(`Tem certeza que deseja excluir o documento "${title}"?`)) {
            // 💡 Ação: Chama a função de exclusão do contexto
            deleteDocument(id); 
            router.push('/');
        }
    };

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
                
                {/* TÍTULO E BOTÃO DE EXCLUSÃO */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-grow">
                        <TitleEditor
                            documentId={selectedDocument.id}
                            initialTitle={selectedDocument.title}
                        />
                    </div>
                    
                    {/* BOTÃO DE EXCLUSÃO */}
                    <button
                        onClick={handleDelete}
                        className="ml-4 p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition duration-200 shadow-md"
                        title="Excluir Documento"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
                
                {/* EDITOR E PREVIEW (Split-View) */}
                <div className="flex-grow h-full">
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