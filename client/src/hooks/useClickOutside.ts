import { RefObject, useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLDivElement>, callback: () => any) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
};

export default useClickOutside;
