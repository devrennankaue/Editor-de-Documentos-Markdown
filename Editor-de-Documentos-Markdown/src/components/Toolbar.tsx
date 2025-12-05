// src/components/Toolbar.tsx
import React from 'react';
import { Bold, Italic, Type, Link, Image } from 'lucide-react'; 

interface ToolbarProps {
  insertMarkdown: (prefix: string, suffix: string) => void;
  // 💡 CORREÇÃO DE TIPAGEM: Adicionando className para resolver o erro TS2322
  className?: string; 
}

const ToolbarButton: React.FC<{ icon: React.ReactNode, onClick: () => void, label: string }> = ({ icon, onClick, label }) => (
    <button
        onClick={onClick}
        title={label}
        className="p-2 rounded hover:bg-gray-600 transition-colors text-gray-100" 
    >
        {icon}
    </button>
);


export const Toolbar: React.FC<ToolbarProps> = ({ insertMarkdown, className = '' }) => {
  const handleBold = () => insertMarkdown('**', '**');
  const handleItalic = () => insertMarkdown('_', '_');
  const handleHeading = () => insertMarkdown('## ', '');
  const handleLink = () => insertMarkdown('[Link Text](', ')');
  const handleImage = () => insertMarkdown('![Alt Text](', ')');

  return (
    <div className={`flex space-x-2 border border-gray-600 ${className}`}>
        <ToolbarButton icon={<Bold size={18} />} onClick={handleBold} label="Negrito (Bold)" />
        <ToolbarButton icon={<Italic size={18} />} onClick={handleItalic} label="Itálico (Italic)" />
        <ToolbarButton icon={<Type size={18} />} onClick={handleHeading} label="Título (Heading 2)" />
        <div className="w-px bg-gray-600"></div>
        <ToolbarButton icon={<Link size={18} />} onClick={handleLink} label="Link" />
        <ToolbarButton icon={<Image size={18} />} onClick={handleImage} label="Imagem" />
    </div>
  );
};