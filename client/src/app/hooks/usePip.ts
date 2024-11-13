import { type RefObject, useState } from 'react';

const usePip = (ref: RefObject<HTMLVideoElement>) => {
  const [isPip, setIsPip] = useState(false);

  const togglePip = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      setIsPip(false);
    } else {
      if (ref.current && ref.current.requestPictureInPicture) {
        ref.current.requestPictureInPicture();
        setIsPip(true);
      }
    }
  };

  return { isPip, togglePip };
};

export default usePip;
