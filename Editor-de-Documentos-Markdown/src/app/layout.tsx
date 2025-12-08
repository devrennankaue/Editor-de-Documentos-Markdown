// src/app/layout.tsx

import { DocumentsProvider } from '@/context/DocumentsContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning className="h-full"> 
      <body className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 h-full">
        <ThemeProvider>
          <DocumentsProvider>
            {children}
          </DocumentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}