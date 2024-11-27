import Hls from 'hls.js';
import { type MutableRefObject, useEffect, useRef, useState } from 'react';

const useHls = ({ videoRef, liveUrl }: { videoRef: MutableRefObject<HTMLVideoElement | null>; liveUrl: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isError, setIsError] = useState(false);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const handleWaiting = () => {
      setIsBuffering(true);
    };
    const handlePlaying = () => {
      setIsBuffering(false);
    };

    const addEventListeners = () => {
      if (!videoRef.current) return;
      videoRef.current.addEventListener('waiting', handleWaiting);
      videoRef.current.addEventListener('playing', handlePlaying);
    };
    const removeEventListeners = () => {
      if (!videoRef.current) return;
      videoRef.current.removeEventListener('waiting', handleWaiting);
      videoRef.current.removeEventListener('playing', handlePlaying);
    };

    const init = () => {
      setIsLoading(false);
      setIsBuffering(false);
      setIsError(false);
      if (!videoRef.current) return;
      if (Hls.isSupported()) {
        hlsRef.current = new Hls({
          startLevel: -1,
          backBufferLength: 0,
          liveSyncDuration: 1,
          liveMaxLatencyDuration: 2,
          liveDurationInfinity: true,
          maxBufferHole: 1,
        });
        hlsRef.current.loadSource(liveUrl);
        hlsRef.current.attachMedia(videoRef.current);

        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current!.play();
        });

        addEventListeners();
      } else if (videoRef.current!.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = liveUrl;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current!.play();
        });

        addEventListeners();
      } else {
        setIsError(true);
      }

      setIsLoading(false);
    };

    init();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      removeEventListeners();
    };
  }, [liveUrl, videoRef]);

  return { isBuffering, isError, isLoading };
};

export default useHls;
