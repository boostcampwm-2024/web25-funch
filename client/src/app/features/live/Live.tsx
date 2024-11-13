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
import PlaySvg from '@components/svgs/PlaySvg';
import PauseSvg from '@components/svgs/PauseSvg';
import SoundLowSvg from '@components/svgs/SoundLowSvg';
import SoundMutedSvg from '@components/svgs/SoundMutedSvg';
import SoundHighSvg from '@components/svgs/SoundHighSvg';
import HeartSvg from '@components/svgs/HeartSvg';
import VideoIconButton from './VideoIconButton';
import FullscreenSvg from '@components/svgs/FullscreenSvg';
import FullscreenQuitSvg from '@components/svgs/FullscreenQuitSvg';

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
    isPip: boolean;
    play: () => void;
    pause: () => void;
    pipToggle: () => void;
    isFullscreen: boolean;
    toggleFullscreen: () => void;
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
  const [isPip, setIsPip] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const play = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const pipToggle = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      setIsPip(false);
    } else {
      if (videoRef.current && videoRef.current.requestPictureInPicture) {
        videoRef.current.requestPictureInPicture();
        setIsPip(true);
      }
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

  // isFullscreen이 변경될 때마다 fullscreen을 실행하거나 종료한다.
  useEffect(() => {
    const fullscreen = () => {
      if (videoWrapperRef.current && videoWrapperRef.current.requestFullscreen) {
        videoWrapperRef.current.requestFullscreen();
      }
    };

    const quitFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    };

    if (isFullscreen) {
      fullscreen();
    } else {
      if (document.fullscreenElement !== null) {
        quitFullscreen();
      }
    }
  }, [isFullscreen]);

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

  useEffect(() => {
    console.log('isPip', isPip);
  }, [isPip]);

  return children({
    volume,
    videoRef,
    videoWrapperRef,
    isShowControls,
    isPip,
    play,
    pause,
    isFullscreen,
    toggleFullscreen,
    toggleMute,
    pipToggle,
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
  return (
    <button onClick={play} className="text-content-static-white inline-flex h-10 w-10 items-center justify-center">
      <PlaySvg />
    </button>
  );
};

const FullscreenButton = ({
  isFullscreen,
  toggleFullscreen,
}: {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}) => {
  return (
    <VideoIconButton onClick={toggleFullscreen} componentType={isFullscreen ? 'FULLSCREEN' : 'DEFAULT'}>
      {isFullscreen ? <FullscreenQuitSvg /> : <FullscreenSvg />}
    </VideoIconButton>
  );
};

const PipQuitButton = () => {
  return (
    <button>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="17.75" y="18.5" width="9" height="6" rx="1" fill="white"></rect>{' '}
        <rect
          x="17.25"
          y="18"
          width="10"
          height="7"
          rx="1.5"
          stroke="black"
          stroke-opacity="0.1"
          stroke-linejoin="round"
        ></rect>{' '}
        <path
          d="M12.75 14.5L16.25 18"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{' '}
        <path
          d="M12.75 17.5V14.5H15.75"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{' '}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.25 12.75C9.25 11.7835 10.0335 11 11 11H25C25.9665 11 26.75 11.7835 26.75 12.75V16H25.25V12.75C25.25 12.6119 25.1381 12.5 25 12.5H11C10.8619 12.5 10.75 12.6119 10.75 12.75V22.75C10.75 22.8881 10.8619 23 11 23H15.25V24.5H11C10.0335 24.5 9.25 23.7165 9.25 22.75V12.75Z"
          fill="white"
        ></path>{' '}
        <path
          d="M26.75 16.5C27.0261 16.5 27.25 16.2761 27.25 16V12.75C27.25 11.5074 26.2426 10.5 25 10.5H11C9.75736 10.5 8.75 11.5074 8.75 12.75V22.75C8.75 23.9926 9.75736 25 11 25H15.25C15.5261 25 15.75 24.7761 15.75 24.5V23C15.75 22.7239 15.5261 22.5 15.25 22.5H11.25V13H24.75V16C24.75 16.2761 24.9739 16.5 25.25 16.5H26.75Z"
          stroke="black"
          stroke-opacity="0.1"
          stroke-linecap="square"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  );
};

const PipButton = () => {
  return (
    <button>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="17.75" y="18.5" width="9" height="6" rx="1" fill="white"></rect>{' '}
        <rect
          x="17.25"
          y="18"
          width="10"
          height="7"
          rx="1.5"
          stroke="black"
          stroke-opacity="0.1"
          stroke-linejoin="round"
        ></rect>{' '}
        <path
          d="M16.25 18L12.75 14.5"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{' '}
        <path
          d="M16.25 15L16.25 18L13.25 18"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{' '}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.25 12.75C9.25 11.7835 10.0335 11 11 11H25C25.9665 11 26.75 11.7835 26.75 12.75V16H25.25V12.75C25.25 12.6119 25.1381 12.5 25 12.5H11C10.8619 12.5 10.75 12.6119 10.75 12.75V22.75C10.75 22.8881 10.8619 23 11 23H15.25V24.5H11C10.0335 24.5 9.25 23.7165 9.25 22.75V12.75Z"
          fill="white"
        ></path>{' '}
        <path
          d="M26.75 16.5C27.0261 16.5 27.25 16.2761 27.25 16V12.75C27.25 11.5074 26.2426 10.5 25 10.5H11C9.75736 10.5 8.75 11.5074 8.75 12.75V22.75C8.75 23.9926 9.75736 25 11 25H15.25C15.5261 25 15.75 24.7761 15.75 24.5V23C15.75 22.7239 15.5261 22.5 15.25 22.5H11.25V13H24.75V16C24.75 16.2761 24.9739 16.5 25.25 16.5H26.75Z"
          stroke="black"
          stroke-opacity="0.1"
          stroke-linecap="square"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  );
};

const PipToggleButton = ({ pipToggle, isPip }: { pipToggle: () => void; isPip: boolean }) => {
  return <VideoIconButton onClick={pipToggle}>{isPip ? <PipQuitButton /> : <PipButton />}</VideoIconButton>;
};

const PauseButton = ({ pause }: { pause: () => void }) => {
  return (
    <button onClick={pause} className="text-content-static-white inline-flex h-10 w-10 items-center justify-center">
      <PauseSvg />
    </button>
  );
};

const MuteButton = ({ toggleMute }: { toggleMute: () => void }) => {
  return (
    <button
      onClick={toggleMute}
      className="text-content-static-white inline-flex h-10 w-10 items-center justify-center"
    >
      <SoundMutedSvg />
      <SoundLowSvg />
      <SoundHighSvg />
    </button>
  );
};

const PlayToggleButton = ({ play }: { play: () => void }) => {
  return <></>;
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
        <div className="ml-2.5 w-60">
          <h4
            title={liveInfo.streamer.name}
            className="text-content-neutral-strong funch-bold16 w-full overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {liveInfo.streamer.name}
          </h4>
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
        <div className="ml-4 pt-5">
          <button
            className={clsx(
              'inline-flex h-8 items-center gap-0.5 rounded-full pl-3.5 pr-4',
              'bg-surface-brand-strong text-content-neutral-inverse hover:bg-surface-brand-base',
            )}
          >
            <HeartSvg />
            <span className="funch-meta14">팔로우</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Live = Object.assign(LiveController, {
  VideoWrapper,
  Video,
  VideoControllersWrapper,
  Play: PlayToggleButton,
  Fullscreen: FullscreenButton,
  Pip: PipToggleButton,
  Pause: PauseButton,
  Mute: MuteButton,
  Volume: VolumeController,
  Info: LiveInfo,
});

export default Live;
