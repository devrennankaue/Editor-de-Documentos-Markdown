// src/components/header.jsx (ou .tsx)
import React from 'react';
import { FileText, Moon, Sun } from 'lucide-react'; // Importe os ícones
import { useTheme } from '../context/ThemeContext'; // Ajuste o caminho

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        // 💡 CORREÇÃO DE ESTILO E HIDRATAÇÃO: A borda inferior é o ponto de conflito
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
            
            <div className="flex items-center space-x-2">
                {/* 💡 CORREÇÃO DO ÍCONE: Garantindo cor e tamanho */}
                <FileText size={24} className="text-blue-600 dark:text-blue-400" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ADA Markdown Editor
                </h1>
            </div>

            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </header>
    );
};

export default Header;