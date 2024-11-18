import { type RefObject, useCallback, useEffect, useState } from 'react';

const usePip = (ref: RefObject<HTMLVideoElement>) => {
  const [isPip, setIsPip] = useState(false);

  const togglePip = useCallback(() => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      if (ref.current && ref.current.requestPictureInPicture) {
        ref.current.requestPictureInPicture();
      }
    }
  }, [ref]);

  useEffect(() => {
    const handleEnterPip = () => {
      if (document.pictureInPictureElement) {
        setIsPip(true);
      }
    };
    const handleLeavePip = () => {
      if (!document.pictureInPictureElement) {
        setIsPip(false);
      }
    };
    if (ref.current) {
      ref.current.addEventListener('enterpictureinpicture', handleEnterPip);
      ref.current.addEventListener('leavepictureinpicture', handleLeavePip);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('enterpictureinpicture', handleEnterPip);
        ref.current.removeEventListener('leavepictureinpicture', handleLeavePip);
      }
    };
  }, []);

  return { isPip, togglePip };
};

export default usePip;
