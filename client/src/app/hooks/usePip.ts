import { type RefObject, useState } from 'react';

const usePip = (ref: RefObject<HTMLVideoElement>) => {
  const [isPip, setIsPip] = useState(false);

  const pipToggle = () => {
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

  return { isPip, pipToggle };
};

export default usePip;
