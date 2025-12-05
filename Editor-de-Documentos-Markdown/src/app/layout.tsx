import { ThemeProvider } from '../context/ThemeContext'; // Ajuste o caminho
import { DocumentsProvider } from '../context/DocumentsContext'; // Seu Contexto

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning> 
      <body className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">
        <ThemeProvider>
          <DocumentsProvider>
            {/* O conteúdo da página (children) será renderizado aqui */}
            {children}
          </DocumentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}