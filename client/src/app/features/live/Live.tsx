'use client';

import {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import Hls from 'hls.js';

const LiveController = ({
  children,
}: {
  children: (args: {
    isStreaming: boolean;
    volume: number;
    videoRef: RefObject<HTMLVideoElement>;
    videoWrapperRef: RefObject<HTMLDivElement>;
    play: () => void;
    pause: () => void;
    fullscreen: () => void;
    pip: () => void;
    handleChangeVolue: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => ReactNode;
}) => {
  // 유효한 스트리밍인지 어떻게 알 수 있을까?
  const [isStreaming, setIsStreaming] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(50);

  const play = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  };

  const fullscreen = () => {
    if (videoWrapperRef.current && videoWrapperRef.current.requestFullscreen) {
      videoWrapperRef.current.requestFullscreen();
    }
  };

  const pip = () => {
    if (videoRef.current && videoRef.current.requestPictureInPicture) {
      videoRef.current.requestPictureInPicture();
    }
  };

  const pause = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  const handleChangeVolue = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(e.target.value);
    setVolume(nextVolume);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(
        'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
      );
      hls.attachMedia(videoRef.current);

      // hls.on(Hls.Events.MANIFEST_PARSED, () => {
      //   videoRef.current!.play();
      // });
      return () => hls.destroy();
    } else if (videoRef.current!.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src =
        'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8';
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current!.play();
      });
    }
  }, []);

  return children({
    isStreaming,
    volume,
    videoRef,
    videoWrapperRef,
    play,
    pause,
    fullscreen,
    pip,
    handleChangeVolue,
  });
};

const VideoWrapper = forwardRef(({ children }: PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="w-full" ref={ref}>
      {children}
    </div>
  );
});

const Video = forwardRef(({}: {}, ref: ForwardedRef<HTMLVideoElement>) => {
  return (
    <div className="pb-live-aspect-ratio relative w-full">
      <div className="absolute left-0 top-0 h-full w-full">
        <video ref={ref} controls autoPlay controlsList="nodownload" width="100%" height="100%" playsInline />
      </div>
    </div>
  );
});

const PlayButton = ({ play }: { play: () => void }) => {
  return <button onClick={play}>재생</button>;
};

const FullscreenButton = ({ fullscreen }: { fullscreen: () => void }) => {
  return <button onClick={fullscreen}>풀스크린</button>;
};

const PipButton = ({ pip }: { pip: () => void }) => {
  return <button onClick={pip}>PIP</button>;
};

const PauseButton = ({ pause }: { pause: () => void }) => {
  return <button onClick={pause}>일시정지</button>;
};

const VolumeController = ({
  volume,
  handleChangeVolue,
}: {
  volume: number;
  handleChangeVolue: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <input type="range" min="0" max="100" value={volume} onChange={handleChangeVolue} />;
};

const Live = Object.assign(LiveController, {
  VideoWrapper,
  Video,
  Play: PlayButton,
  Fullscreen: FullscreenButton,
  Pip: PipButton,
  Pause: PauseButton,
  Volume: VolumeController,
});

export default Live;
