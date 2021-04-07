import { useEffect } from 'react';

export function useListener(event, func, listenOn) {
  useEffect(() => {
    func();
    const listenedOn = listenOn === 'window' ? window : document;
    listenedOn.addEventListener(event, func);
    return () => {
      listenedOn.removeEventListener(event, func);
    };
  }, []);
}
