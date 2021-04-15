import { useEffect, useState } from 'react';

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

export function useAPI(fn) {
  const [apiState, setAPIState] = useState({
    loading: false,
    error: '',
    result: null,
  });

  useEffect(() => {
    let mounted = true;
    const setState = (update) =>
      mounted && setAPIState({ ...apiState, ...update });
    const makeAsyncCall = async () => {
      if (!apiState.loading) {
        setState({ loading: true });
        try {
          const newResult = await fn();
          setState({ loading: false, result: newResult });
        } catch (e) {
          console.error(e);
          setState({
            loading: false,
            error: e.message || 'useAPI request error',
          });
        } finally {
          setState({ loading: false });
        }
      }
    };

    makeAsyncCall();

    return () => {
      setAPIState({ result: null, error: '', loading: false });
      mounted = false;
    };
  }, [fn]);
  return { ...apiState };
}
