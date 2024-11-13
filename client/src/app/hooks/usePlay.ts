import { type RefObject, useState } from 'react';

const usePlay = (ref: RefObject<HTMLVideoElement>) => {
  const [isPlay, setIsPlay] = useState(true);

  const playToggle = () => {
    if (ref.current && ref.current.paused) {
      ref.current.play();
      setIsPlay(true);
    } else {
      ref.current?.pause();
      setIsPlay(false);
    }
  };

  return { isPlay, playToggle };
};

export default usePlay;
