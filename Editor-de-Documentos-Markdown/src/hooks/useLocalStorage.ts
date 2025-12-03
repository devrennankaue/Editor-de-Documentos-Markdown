// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

/**
 * Hook customizado para persistir um estado no localStorage.
 * @param key Chave usada no localStorage.
 * @param initialValue Valor inicial caso não haja nada salvo.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Inicializa o estado com o valor salvo no localStorage ou o valor inicial
  const [value, setValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue; // Retorna o valor inicial se não estiver no ambiente do navegador
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect para salvar o valor no localStorage sempre que ele mudar
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Erro ao salvar localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}