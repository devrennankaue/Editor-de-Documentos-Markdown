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
    const { selectedDocument, selectDocument, deleteDocument } = useDocuments();
    const router = useRouter();

    useEffect(() => {
        if (!selectedDocument || selectedDocument.id !== id) {
            selectDocument(id);
        }
    }, [id, selectedDocument, selectDocument]);

    const handleDelete = () => {
        const title = selectedDocument?.title || "este documento";
        
        if (confirm(`Tem certeza que deseja excluir o documento "${title}"?`)) {
            deleteDocument(id);
            router.push('/');
        }
    };

    if (!selectedDocument) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="p-8 flex-grow text-gray-500 flex items-center justify-center">
                    Carregando documento ou documento não encontrado...
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex flex-col overflow-hidden"> 
            <Header />
            
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white flex-shrink-0">
                    <div className="flex-grow">
                        <TitleEditor
                            documentId={selectedDocument.id}
                            initialTitle={selectedDocument.title}
                        />
                    </div>
                    
                    <button
                        onClick={handleDelete}
                        className="ml-4 p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition duration-200 shadow-md flex-shrink-0"
                        title="Excluir Documento"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
        
                <div className="flex-1 min-h-0 overflow-hidden p-4">
                    <DocumentEditor 
                        documentId={selectedDocument.id} 
                        initialContent={selectedDocument.content} 
                    />
                </div>
            </main>
        </div>
    );
}