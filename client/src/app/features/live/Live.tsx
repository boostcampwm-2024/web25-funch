'use client';

import {
  type ChangeEvent,
  type ForwardedRef,
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import Hls from 'hls.js';
import useLiveContext from '@hooks/useLiveContext';
import Image from 'next/image';
import { comma } from '@libs/formats';
import clsx from 'clsx';
import Badge from '@app/features/Badge';

const demoHlsUrl =
  'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8';

const LiveController = ({
  children,
}: {
  children: (args: {
    volume: number;
    videoRef: RefObject<HTMLVideoElement>;
    videoWrapperRef: RefObject<HTMLDivElement>;
    isShowControls: boolean;
    play: () => void;
    pause: () => void;
    fullscreen: () => void;
    pip: () => void;
    toggleMute: () => void;
    handleChangeVolume: (e: ChangeEvent<HTMLInputElement>) => void;
    handleMouseMoveOnVideoWrapper: () => void;
    handleMouseLeaveFromVideoWrapper: () => void;
  }) => ReactNode;
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(50);
  const [isShowControls, setIsShowControls] = useState(false);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(e.target.value);
    setVolume(nextVolume);
  };

  const handleMouseMoveOnVideoWrapper = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsShowControls(true);
    timerRef.current = setTimeout(() => {
      setIsShowControls(false);
    }, 3000);
  };

  const handleMouseLeaveFromVideoWrapper = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsShowControls(false);
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
      hls.loadSource(demoHlsUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current!.play();
      });
      return () => hls.destroy();
    } else if (videoRef.current!.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = demoHlsUrl;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current!.play();
      });
    }
  }, []);

  return children({
    volume,
    videoRef,
    videoWrapperRef,
    isShowControls,
    play,
    pause,
    fullscreen,
    toggleMute,
    pip,
    handleChangeVolume,
    handleMouseMoveOnVideoWrapper,
    handleMouseLeaveFromVideoWrapper,
  });
};

type VideoWrapperProps = PropsWithChildren<{
  isShowControls: boolean;
  handleMouseMove: () => void;
  handleMouseLeave: () => void;
}>;

const VideoWrapper = forwardRef(
  (
    { children, isShowControls, handleMouseLeave, handleMouseMove }: VideoWrapperProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        className={clsx('w-full', isShowControls ? 'cursor-auto' : 'cursor-none')}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="pb-live-aspect-ratio relative block w-full">{children}</div>
      </div>
    );
  },
);

const Video = forwardRef(({}: {}, ref: ForwardedRef<HTMLVideoElement>) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <video
        ref={ref}
        className="bg-surface-static-black absolute left-0 top-0 h-full w-full"
        controlsList="nodownload"
        playsInline
      />
    </div>
  );
});

const VideoControllersWrapper = ({ children }: PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className="funch-overlay absolute bottom-0 left-0 right-0 top-0">{children}</div>;
};

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

const MuteButton = ({ toggleMute }: { toggleMute: () => void }) => {
  return <button onClick={toggleMute}>음소거</button>;
};

const VolumeController = ({
  volume,
  handleChangeVolume,
}: {
  volume: number;
  handleChangeVolume: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <input type="range" min="0" max="100" value={volume} onChange={handleChangeVolume} />;
};

const LiveInfo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { liveInfo } = useLiveContext();

  return (
    <div className="px-7 pb-6 pt-4">
      <h3 className="funch-bold20 text-content-neutral-strong">{liveInfo.title}</h3>
      <div className="mt-4 flex">
        <div
          // image wrapper
          className="relative h-16 w-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-full w-full p-1.5">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                fill={true}
                sizes="100%"
                src={liveInfo.streamer.profileImage}
                alt={`스트리머 ${liveInfo.streamer.name}의 프로필 이미지`}
              />
            </div>
          </div>
          <div
            className={clsx(
              'border-border-brand-base absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-solid',
              isHovered ? 'border-4' : 'border-2',
            )}
          />
        </div>
        <div className="ml-2.5">
          <h4 className="text-content-neutral-strong funch-bold16">{liveInfo.streamer.name}</h4>
          {liveInfo.tags.length > 0 && (
            <ul className="mt-1.5 flex gap-1">
              {liveInfo.tags.map((tag, idx) => (
                <li key={idx}>
                  <Badge componentType="OUTLINE">{tag}</Badge>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-1">
            <span className="funch-medium12 text-content-neutral-base">{comma(liveInfo.viewers)}명 시청 중</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Live = Object.assign(LiveController, {
  VideoWrapper,
  Video,
  VideoControllersWrapper,
  Play: PlayButton,
  Fullscreen: FullscreenButton,
  Pip: PipButton,
  Pause: PauseButton,
  Mute: MuteButton,
  Volume: VolumeController,
  Info: LiveInfo,
});

export default Live;
