'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from '@mui/material';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  // Carrega o tema do localStorage no primeiro render do cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const initialTheme = savedTheme || 'light';
      setThemeState(initialTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  const toggleTheme = () => {
    setThemeState((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return newTheme;
    });
  };

  // Cria o tema do MUI baseado no estado do tema
  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          ...(theme === 'light'
            ? {
                // Tema claro
                background: {
                  default: '#f9fafb',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#111827',
                  secondary: '#6b7280',
                },
              }
            : {
                // Tema escuro
                background: {
                  default: '#111827',
                  paper: '#1f2937',
                },
                text: {
                  primary: '#f9fafb',
                  secondary: '#d1d5db',
                },
              }),
        },
      }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};