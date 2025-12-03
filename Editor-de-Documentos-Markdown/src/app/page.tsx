// src/app/page.tsx
'use client'; 

import { useDocuments } from '../context/DocumentsContext';
import { useRouter } from 'next/navigation'; // Hook do Next.js para navegação

export default function DocumentListPage() {
  const { documents, createDocument, selectDocument } = useDocuments();
  const router = useRouter();

  const handleCreateNew = () => {
    // 1. Cria o novo documento e obtém o ID
    const newId = createDocument();
    
    // 2. Redireciona para a página de edição (que vamos criar)
    router.push(`/doc/${newId}`);
  };

  const handleSelectDocument = (id: string) => {
    selectDocument(id);
    router.push(`/doc/${id}`);
  };
  
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">📝 Meus Documentos</h1>
      
      {/* Botão de criação */}
      <button 
        onClick={handleCreateNew}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        + Criar Novo Documento
      </button>

      {/* Lista de Documentos */}
      <div className="space-y-4">
        {documents.length === 0 ? (
          <p className="text-gray-500">Nenhum documento encontrado. Crie um novo para começar.</p>
        ) : (
          documents.map((doc) => (
            <div 
              key={doc.id} 
              onClick={() => handleSelectDocument(doc.id)}
              className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150"
            >
              <h2 className="text-xl font-semibold">{doc.title}</h2>
              <p className="text-sm text-gray-500">
                Última Atualização: {new Date(doc.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}