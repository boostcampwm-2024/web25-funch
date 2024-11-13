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
import clsx from 'clsx';
import PlaySvg from '@components/svgs/PlaySvg';
import PauseSvg from '@components/svgs/PauseSvg';
import SoundLowSvg from '@components/svgs/SoundLowSvg';
import SoundMutedSvg from '@components/svgs/SoundMutedSvg';
import SoundHighSvg from '@components/svgs/SoundHighSvg';
import VideoIconButton from './VideoIconButton';
import FullscreenSvg from '@components/svgs/FullscreenSvg';
import FullscreenQuitSvg from '@components/svgs/FullscreenQuitSvg';
import PipSvg from '@components/svgs/PipSvg';
import PipQuitSvg from '@components/svgs/PipQuitSvg';
import { VIDEO_ICON_COMPONENT_TYPE } from '@libs/constants';
import LiveInfo from './LiveInfo';
import useFullscreen from '@hooks/useFullscreen';
import usePip from '@hooks/usePip';
import useMouseMovementOnElement from '@hooks/useMouseMovementOnElement';

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
    isPlay: boolean;
    playToggle: () => void;
    pipToggle: () => void;
    isFullscreen: boolean;
    startFullscreen: () => void;
    exitFullscreen: () => void;
    toggleMute: () => void;
    handleChangeVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => ReactNode;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(50);
  const [isPlay, setIsPlay] = useState(true);

  const { isFullscreen, startFullscreen, exitFullscreen } = useFullscreen(videoWrapperRef);

  const { isPip, pipToggle } = usePip(videoRef);

  const { isMouseMoving } = useMouseMovementOnElement(videoWrapperRef);

  const playToggle = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlay(true);
    } else {
      videoRef.current?.pause();
      setIsPlay(false);
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
    isShowControls: isMouseMoving,
    isPip,
    isPlay,
    playToggle,
    isFullscreen,
    startFullscreen,
    exitFullscreen,
    toggleMute,
    pipToggle,
    handleChangeVolume,
  });
};

type VideoWrapperProps = PropsWithChildren<{
  isShowControls: boolean;
}>;

const VideoWrapper = forwardRef(
  ({ children, isShowControls }: VideoWrapperProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={clsx('w-full', isShowControls ? 'cursor-auto' : 'cursor-none')} ref={ref}>
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

const FullscreenButton = ({
  isFullscreen,
  startFullscreen,
  exitFullscreen,
}: {
  isFullscreen: boolean;
  startFullscreen: () => void;
  exitFullscreen: () => void;
}) => {
  return (
    <VideoIconButton
      onClick={() => {
        isFullscreen ? exitFullscreen() : startFullscreen();
      }}
      componentType={isFullscreen ? VIDEO_ICON_COMPONENT_TYPE.FULLSCREEN : VIDEO_ICON_COMPONENT_TYPE.DEFAULT}
    >
      {isFullscreen ? <FullscreenQuitSvg /> : <FullscreenSvg />}
    </VideoIconButton>
  );
};

const PipToggleButton = ({
  pipToggle,
  isPip,
  isFullscreen,
}: {
  pipToggle: () => void;
  isPip: boolean;
  isFullscreen: boolean;
}) => {
  return (
    <VideoIconButton
      componentType={isFullscreen ? VIDEO_ICON_COMPONENT_TYPE.FULLSCREEN : VIDEO_ICON_COMPONENT_TYPE.DEFAULT}
      onClick={pipToggle}
    >
      {isPip ? <PipQuitSvg /> : <PipSvg />}
    </VideoIconButton>
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

const PlayToggleButton = ({
  playToggle,
  isPlay,
  isFullscreen,
}: {
  playToggle: () => void;
  isPlay: boolean;
  isFullscreen: boolean;
}) => {
  return (
    <VideoIconButton
      componentType={isFullscreen ? VIDEO_ICON_COMPONENT_TYPE.FULLSCREEN : VIDEO_ICON_COMPONENT_TYPE.DEFAULT}
      onClick={playToggle}
    >
      {isPlay ? <PauseSvg /> : <PlaySvg />}
    </VideoIconButton>
  );
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

const Live = Object.assign(LiveController, {
  VideoWrapper,
  Video,
  VideoControllersWrapper,
  Play: PlayToggleButton,
  Fullscreen: FullscreenButton,
  Pip: PipToggleButton,
  Mute: MuteButton,
  Volume: VolumeController,
  Info: LiveInfo,
});

export default Live;
