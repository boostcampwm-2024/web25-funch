import Hls from 'hls.js';
import { type RefObject, useEffect } from 'react';

const useHls = ({ videoRef, liveUrl }: { videoRef: RefObject<HTMLVideoElement>; liveUrl: string }) => {
  useEffect(() => {
    if (!videoRef.current) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(liveUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current!.play();
      });
      return () => hls.destroy();
    } else if (videoRef.current!.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = liveUrl;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current!.play();
      });
    }
  }, [liveUrl, videoRef]);
};

export default useHls;
