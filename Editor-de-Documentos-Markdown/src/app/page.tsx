// src/app/page.tsx
'use client';

import { useDocuments } from '../context/DocumentsContext';
import { useRouter } from 'next/navigation';
import Header from '../components/header'; 
import { FileText, Plus, Trash2 } from 'lucide-react'; 

export default function DocumentListPage() {
  const { documents, createDocument, deleteDocument } = useDocuments();
  const router = useRouter();

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
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
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

        <div className="space-y-3">
          {documents.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 mt-8 text-center p-8 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              Nenhum documento encontrado. Clique em "Criar Novo Documento" para começar!
            </p>
          ) : (
            documents.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition duration-200"
              >
                
                <FileText size={20} className="text-gray-400 dark:text-gray-500 mr-4 flex-shrink-0" />

                <div 
                  onClick={() => handleSelectDocument(doc.id)}
                  className="flex-grow cursor-pointer"
                >
                  <h2 className="text-lg font-bold truncate">{doc.title}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Última Atualização: {new Date(doc.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if(window.confirm(`Tem certeza que deseja excluir o documento "${doc.title}"?`)) {
                      deleteDocument(doc.id);
                    }
                  }}
                  className="p-2 rounded-full text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition-colors ml-4 flex-shrink-0"
                  title={`Excluir Documento "${doc.title}"`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}