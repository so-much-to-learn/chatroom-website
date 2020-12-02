import { useEffect, useRef, useCallback } from 'react';

const useRefCallback = (fn: Function, deps: [any]) => {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn; // 保存闭包
  }, [fn, ...deps]);

  return useCallback(() => {
    return ref.current();
  }, [ref]);
};

export default useRefCallback;
