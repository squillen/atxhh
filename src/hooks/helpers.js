import { useEffect } from 'react';

export function useWindowListeners(event, func) {
  useEffect(() => {
    window.addEventListener(event, func);
    return () => {
      window.removeEventListener(event, func);
    };
  }, []);
}
