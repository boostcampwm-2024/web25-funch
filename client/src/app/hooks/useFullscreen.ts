import { type RefObject, useCallback, useEffect, useState } from 'react';

const useFullscreen = (ref: RefObject<HTMLDivElement>) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const startFullscreen = useCallback(() => {
    if (ref.current && ref.current.requestFullscreen) {
      ref.current.requestFullscreen();
    }
  }, [ref]);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return { isFullscreen, startFullscreen, exitFullscreen };
};

export default useFullscreen;
