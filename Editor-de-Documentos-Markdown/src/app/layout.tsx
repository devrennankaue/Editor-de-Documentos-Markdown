import { DocumentsProvider } from '@/context/DocumentsContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning> 
      <body suppressHydrationWarning>
        <ThemeProvider>
          <DocumentsProvider>
            {children}
          </DocumentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}