// src/components/header.tsx

'use client'; 
import React, { useState, useEffect } from 'react';
import { FileText, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme(); 

    if (!theme) {
        return <div className="p-1.5 w-8 h-8 opacity-0" aria-hidden="true" />;
    }

    const Icon = theme === 'dark' ? Sun : Moon;
    const title = theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro';
    

    return (
        <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={title}
        >
            <Icon size={20} />
        </button>
    );
};


const Header = () => {
    return (
        <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors shadow-sm flex-shrink-0">
            
            <div className="flex items-center space-x-2">
                <FileText size={20} className="text-blue-600 dark:text-blue-400" />
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ADA Markdown Editor
                </h1>
            </div>

            <ThemeToggleButton />
        </header>
    );
};

export default Header;