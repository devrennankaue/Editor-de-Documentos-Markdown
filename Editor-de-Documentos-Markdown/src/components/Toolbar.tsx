// src/components/Toolbar.tsx
import React from 'react';
import { Bold, Italic, Type, List, Link, Image } from 'lucide-react';

interface ToolbarProps {
    insertMarkdown: (prefix: string, suffix: string) => void;
    className?: string; 
}

const ToolbarButton: React.FC<{ icon: React.ReactNode, onClick: () => void, label: string }> = ({ icon, onClick, label }) => (
    <button
        onClick={onClick}
        title={label}
        className="p-1.5 rounded text-gray-700 hover:bg-gray-200 transition-colors"
    >
        {icon}
    </button>
);


export const Toolbar: React.FC<ToolbarProps> = ({ insertMarkdown, className = '' }) => {
    const handleBold = () => insertMarkdown('**', '**');
    const handleItalic = () => insertMarkdown('_', '_');
    const handleHeading = () => insertMarkdown('## ', '');
    const handleList = () => insertMarkdown('- ', '');
    const handleLink = () => insertMarkdown('[Link Text](', ')');
    const handleImage = () => insertMarkdown('![Alt Text](', ')');

    return (
        <div className={`flex items-center gap-1.5 ${className}`}>
            
            <ToolbarButton icon={<Bold size={18} />} onClick={handleBold} label="Negrito (**bold**)" />
            <ToolbarButton icon={<Italic size={18} />} onClick={handleItalic} label="Itálico (*italic*)" />

            <div className="w-px h-5 bg-gray-300 mx-1"></div> 

            <ToolbarButton icon={<Type size={18} />} onClick={handleHeading} label="Título (## Heading)" />
            <ToolbarButton icon={<List size={18} />} onClick={handleList} label="Lista Simples (- item)" />

            <div className="w-px h-5 bg-gray-300 mx-1"></div>

            <ToolbarButton icon={<Link size={18} />} onClick={handleLink} label="Link ([text](url))" />
            <ToolbarButton icon={<Image size={18} />} onClick={handleImage} label="Imagem (![alt](url))" />
            
        </div>
    );
};