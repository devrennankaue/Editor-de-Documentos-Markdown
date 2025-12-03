// src/components/Providers.tsx
'use client'; 

import React, { ReactNode } from 'react';
import { DocumentsProvider } from '../context/DocumentsContext'; 

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    // Coloque todos os seus provedores de contexto aqui
    <DocumentsProvider>
      {children}
    </DocumentsProvider>
  );
}