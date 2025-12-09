// src/app/page.tsx
'use client';

import { useDocuments } from '../context/DocumentsContext';
import { useRouter } from 'next/navigation';
import Header from '../components/header'; 
import { Plus, Trash2, Edit } from 'lucide-react'; 
import { useState, useEffect } from 'react';

export default function DocumentListPage() {
  const { documents, createDocument, deleteDocument } = useDocuments();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateNew = () => {
    const newId = createDocument();
    router.push(`/doc/${newId}`);
  };

  const handleSelectDocument = (id: string) => {
    router.push(`/doc/${id}`);
  };
  
  return (
    <div>
      <Header />
      <main className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10 mt-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Meus Documentos
          </h1>
          
          <button 
            onClick={handleCreateNew}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-[1.02]"
          >
            <Plus size={18} />
            <span>Criar Novo Documento</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mx-8 sm:mx-12 md:mx-16">
          {!mounted ? (
            <p className="text-gray-500 mt-8 text-center p-8 border border-dashed border-gray-300 rounded-lg">
              Carregando...
            </p>
          ) : documents.length === 0 ? (
            <p className="text-gray-500 mt-8 text-center p-8 border border-dashed border-gray-300 rounded-lg">
              Nenhum documento encontrado. Clique em "Criar Novo Documento" para começar!
            </p>
          ) : (
            documents.map((doc, index) => (
              <div key={doc.id}>
                <div 
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-grow min-w-0">
                    <h2 className="text-base font-semibold truncate text-gray-900 mb-0.5">
                      {doc.title}
                    </h2>
                    <p className="text-sm text-gray-500 truncate">
                      Última Atualização: {new Date(doc.updatedAt).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <div 
                    className="flex items-center gap-3 ml-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleSelectDocument(doc.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex-shrink-0 text-sm font-medium"
                      title={`Editar Documento "${doc.title}"`}
                    >
                      <Edit size={16} />
                      <span>Editar Documento</span>
                    </button>
                    
                    <button
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if(window.confirm(`Tem certeza que deseja excluir o documento "${doc.title}"?`)) {
                          deleteDocument(doc.id);
                        }
                      }}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors flex-shrink-0"
                      title={`Excluir Documento "${doc.title}"`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                {index < documents.length - 1 && (
                  <div className="border-b border-gray-200 mx-5"></div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
