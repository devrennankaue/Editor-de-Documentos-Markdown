// src/app/page.tsx
'use client';

import { useDocuments } from '../context/DocumentsContext';
import { useRouter } from 'next/navigation';
import  Header  from '../components/header'; 
import { FileText, Plus, Trash2 } from 'lucide-react'; 

export default function DocumentListPage() {
  const { documents, createDocument, deleteDocument } = useDocuments(); // Adicione deleteDocument aqui
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
      <Header /> {/* 💡 INTEGRAÇÃO DO HEADER */}
      <main className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📝 Meus Documentos</h1>
          
          <button 
            onClick={handleCreateNew}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
          >
            <Plus size={18} />
            <span>Criar Novo Documento</span>
          </button>
        </div>

        <div className="space-y-3">
          {documents.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 mt-8">Nenhum documento encontrado. Crie um novo para começar.</p>
          ) : (
            documents.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 hover:shadow-lg transition duration-150"
              >
                <div 
                  onClick={() => handleSelectDocument(doc.id)}
                  className="flex-grow cursor-pointer"
                >
                  <h2 className="text-xl font-semibold">{doc.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Última Atualização: {new Date(doc.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                
                {/* 💡 Botão de Exclusão Rápida (para ponto extra) */}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteDocument(doc.id); }}
                  className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                  title="Excluir Documento"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}