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
import clsx from 'clsx';
import useFullscreen from '@hooks/useFullscreen';
import usePip from '@hooks/usePip';
import useMouseMovementOnElement from '@hooks/useMouseMovementOnElement';
import usePlay from '@hooks/usePlay';
import useFocused from '@hooks/useFocused';
import type { Playlist } from '@libs/internalTypes';
import useHls from '@hooks/useHls';

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
  isBuffering: boolean;
  isError: boolean;
  isLoading: boolean;
};

type Props = {
  children: (args: ChildrenArgs) => ReactNode;
  liveUrl: Playlist['playlistUrl'];
};

const LiveController = ({ children, liveUrl }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  const { isBuffering, isError, isLoading } = useHls({ videoRef, liveUrl });

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
    isBuffering,
    isError,
    isLoading,
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

type VideoProps = {
  isBuffering: boolean;
  isError: boolean;
  isLoading: boolean;
};

const Video = forwardRef(({ isBuffering, isError, isLoading }: VideoProps, ref: ForwardedRef<HTMLVideoElement>) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <video
        ref={ref}
        className="bg-surface-static-black absolute left-0 top-0 h-full w-full"
        controlsList="nodownload"
        playsInline
      />
      {isError ? <Error /> : isBuffering ? <Buffering /> : isLoading ? <Loading /> : null}
    </div>
  );
});

const Buffering = () => {
  return (
    <div className="bg-bg-modal z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <p className="funch-bold20 text-content-neutral-primary">비디오 청크를 정성들여 만드는 중...</p>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="bg-bg-modal z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <p className="funch-bold20 text-content-neutral-primary">로딩 중...</p>
    </div>
  );
};

const Error = () => {
  return (
    <div className="bg-bg-modal z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <p className="funch-bold20 text-content-neutral-primary">비디오를 불러오는 중에 에러가 발생했어요.</p>
    </div>
  );
};

const Live = Object.assign(LiveController, {
  Wrapper: LiveWrapper,
  VideoWrapper,
  Video,
});

export default Live;
