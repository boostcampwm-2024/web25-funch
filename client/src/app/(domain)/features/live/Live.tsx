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
import LiveInfo from './LiveInfo';
import useFullscreen from '@hooks/useFullscreen';
import usePip from '@hooks/usePip';
import useMouseMovementOnElement from '@hooks/useMouseMovementOnElement';
import usePlay from '@hooks/usePlay';
import useFocused from '@hooks/useFocused';

const demoHlsUrl1 = 'https://kr.object.ncloudstorage.com/media-storage/zzawang/master_playlist.m3u8';
const demoHlsUrl2 =
  'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8';

type ChildrenArgs = {
  volume: number;
  videoRef: RefObject<HTMLVideoElement>;
  videoWrapperRef: RefObject<HTMLDivElement>;
  isShowControls: boolean;
  isPip: boolean;
  isPlay: boolean;
  togglePlay: () => void;
  togglePip: () => void;
  isFullscreen: boolean;
  startFullscreen: () => void;
  exitFullscreen: () => void;
  toggleMute: () => void;
  handleChangeVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  updateVolume: (value: number) => void;
};

type Props = {
  children: (args: ChildrenArgs) => ReactNode;
};

const LiveController = ({ children }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(0);
  const [savedVolume, setSavedVolume] = useState(1);

  const { isFocusing } = useFocused(videoWrapperRef);

  const { isFullscreen, startFullscreen, exitFullscreen } = useFullscreen(videoWrapperRef);

  const { isPip, togglePip } = usePip(videoRef);

  const { isMouseMoving } = useMouseMovementOnElement(videoWrapperRef);

  const { isPlay, togglePlay } = usePlay(videoRef);

  const updateVolume = (value: number) => {
    setVolume(value);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (videoRef.current.muted) {
        setVolume(savedVolume);
      } else {
        setSavedVolume(videoRef.current.volume * 100);
        setVolume(0);
      }
    }
  };

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(e.target.value);
    setVolume(nextVolume);

    if (!nextVolume) setSavedVolume(nextVolume);
  };

  useEffect(() => {
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          videoRef.current.muted = true;
        }
      } catch (error) {
        console.error(error);
      }
    };
    playVideo();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }

    if (videoRef.current && volume !== 0) {
      videoRef.current.muted = false;
    }

    if (videoRef.current && volume === 0) {
      videoRef.current.muted = true;
    }
  }, [volume]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(demoHlsUrl2);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current!.play();
      });
      return () => hls.destroy();
    } else if (videoRef.current!.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = demoHlsUrl2;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current!.play();
      });
    }
  }, []);

  const isShowControls = isFocusing || isMouseMoving;

  return children({
    volume,
    videoRef,
    videoWrapperRef,
    isShowControls,
    isPip,
    isPlay,
    togglePlay,
    isFullscreen,
    startFullscreen,
    exitFullscreen,
    toggleMute,
    togglePip,
    handleChangeVolume,
    updateVolume,
  });
};

const LiveWrapper = ({ children }: PropsWithChildren) => {
  return <div className="funch-scrollable bg-bg-weak w-full">{children}</div>;
};

type VideoWrapperProps = PropsWithChildren<{
  isShowControls: boolean;
  isFullscreen: boolean;
}>;

const VideoWrapper = forwardRef(
  ({ children, isShowControls, isFullscreen }: VideoWrapperProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        className={clsx('w-full', {
          'flex items-center': isFullscreen,
        })}
        style={{
          cursor: isShowControls ? 'auto' : 'none',
        }}
        ref={ref}
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

const Live = Object.assign(LiveController, {
  Wrapper: LiveWrapper,
  VideoWrapper,
  Video,
  Info: LiveInfo,
});

export default Live;
