// src/components/Header.tsx
'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext'; 
import { Moon, Sun, FileText } from 'lucide-react'; 
import Link from 'next/link'; 

// 💡 CORREÇÃO: Removemos a tipagem explícita 'React.FC' para evitar o erro de compilação
export const Header = () => {
  
  // O erro de compilação 'useTheme not defined' só é resolvido se o ThemeContext
  // estiver com o 'export const useTheme' correto e a importação acima correta.
  const { theme, toggleTheme } = useTheme(); 

  return (
    <header 
      className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 
                 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300 sticky top-0 z-10"
    >
      
      {/* Logo e Nome do App */}
      <Link href="/" className="flex items-center space-x-3 group">
        <FileText className="text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform" size={28} />
        <h1 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 hidden sm:block">
          ADA Markdown Editor
        </h1>
      </Link>

      {/* Botão de Alternar Tema */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={theme === 'light' ? 'Mudar para Tema Escuro' : 'Mudar para Tema Claro'}
        >
          {theme === 'light' 
            ? <Moon size={20} className="hover:text-amber-500" /> 
            : <Sun size={20} className="hover:text-yellow-300" />
          }
        </button>
      </div>
    </header>
  );
};