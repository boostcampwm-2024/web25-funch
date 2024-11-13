import { RefObject, useEffect, useRef, useState } from 'react';

const useMouseMovementOnElement = (ref: RefObject<HTMLElement>) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  const handleMouseMove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsMouseMoving(true);
    timerRef.current = setTimeout(() => {
      setIsMouseMoving(false);
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsMouseMoving(false);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mousemove', handleMouseMove);
      ref.current.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousemove', handleMouseMove);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return { isMouseMoving };
};

export default useMouseMovementOnElement;
