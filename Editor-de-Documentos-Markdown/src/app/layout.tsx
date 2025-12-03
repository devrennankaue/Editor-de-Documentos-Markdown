// src/app/layout.tsx (Arquivo atualizado)

import './globals.css';
import Providers from '../components/Provider'; // Importe o componente Providers

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        {/* Envolva todo o conteúdo com o componente Providers */}
        <Providers> 
          {children}
        </Providers>
      </body>
    </html>
  );
}