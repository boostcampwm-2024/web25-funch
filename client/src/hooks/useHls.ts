import Hls from 'hls.js';
import { type MutableRefObject, useEffect, useRef, useState } from 'react';

const useHls = ({ videoRef, liveUrl }: { videoRef: MutableRefObject<HTMLVideoElement | null>; liveUrl: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isError, setIsError] = useState(false);
  const hlsRef = useRef<Hls | null>(null);
  const bufferingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleWaiting = () => {
      bufferingTimeoutRef.current = setTimeout(() => {
        setIsBuffering(true);
        // 3초는 생각보다 길다... ㅎㅎ;;
      }, 2000);
    };
    const handlePlaying = () => {
      if (bufferingTimeoutRef.current) {
        clearTimeout(bufferingTimeoutRef.current);
      }
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
          lowLatencyMode: false,
          maxLiveSyncPlaybackRate: 1.5,
          liveSyncDuration: 4,
          liveMaxLatencyDuration: 8,
          liveDurationInfinity: true,
        });
        hlsRef.current.loadSource(liveUrl);
        hlsRef.current.attachMedia(videoRef.current);

        hlsRef.current.on(Hls.Events.ERROR, (_, data) => {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            if (data.details === Hls.ErrorDetails.FRAG_LOAD_ERROR) {
              // HLS.js가 다음 파일을 요청하도록 에러를 무시
              hlsRef.current!.startLoad();
            }
          }
        });

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
      if (bufferingTimeoutRef.current) {
        clearTimeout(bufferingTimeoutRef.current);
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      removeEventListeners();
    };
  }, [liveUrl, videoRef]);

  return { isBuffering, isError, isLoading };
};

export default useHls;
