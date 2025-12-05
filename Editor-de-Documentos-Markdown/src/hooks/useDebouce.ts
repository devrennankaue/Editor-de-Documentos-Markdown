// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

/**
 * Hook que retorna um valor após um período de atraso (delay)
 *
 * @param value O valor a ser 'debounced' (neste caso, o markdownInput)
 * @param delay O tempo de atraso em milissegundos (ex: 500ms)
 * @returns O valor atualizado após o delay.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 1. Configura um timer para atualizar o valor após o delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 2. Limpa o timer anterior se o valor (value) mudar antes do delay
    // Isso é o que 'cancela' a chamada anterior e evita chamadas desnecessárias.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Roda novamente quando 'value' ou 'delay' mudam

  return debouncedValue;
}