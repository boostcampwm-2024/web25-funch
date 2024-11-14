import { type RefObject, useEffect, useState } from 'react';

const usePlay = (ref: RefObject<HTMLVideoElement>) => {
  const [isPlay, setIsPlay] = useState(true);

  const togglePlay = () => {
    if (!ref.current) return;
    if (ref.current.paused) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  };

  useEffect(() => {
    const handlePlay = () => {
      setIsPlay(true);
    };
    const handlePause = () => {
      setIsPlay(false);
    };
    if (ref.current) {
      ref.current.addEventListener('play', handlePlay);
      ref.current.addEventListener('pause', handlePause);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('play', handlePlay);
        ref.current.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  return { isPlay, togglePlay };
};

export default usePlay;
