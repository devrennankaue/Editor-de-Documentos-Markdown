// src/app/layout.tsx (Certifique-se de que está assim)
import { DocumentsProvider } from '@/context/DocumentsContext';
import { ThemeProvider } from '@/context/ThemeContext';
 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 💡 1. Correção: suppressHydrationWarning no <html>
    <html lang="pt-br" suppressHydrationWarning> 
      {/* 💡 2. Aplica classes base que mudam no tema escuro */}
      <body className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">
        <ThemeProvider>
          <DocumentsProvider>
            {children}
          </DocumentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}