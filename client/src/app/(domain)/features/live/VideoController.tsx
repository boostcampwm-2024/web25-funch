'use client';

import LiveSvg from '@components/svgs/LiveSvg';
import useLiveContext from '@hooks/useLiveContext';
import clsx from 'clsx';
import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import VideoIconButton from './VideoIconButton';
import { VIDEO_ICON_COMPONENT_TYPE } from '@libs/constants';
import FullscreenQuitSvg from '@components/svgs/FullscreenQuitSvg';
import FullscreenSvg from '@components/svgs/FullscreenSvg';
import PipQuitSvg from '@components/svgs/PipQuitSvg';
import PipSvg from '@components/svgs/PipSvg';
import SoundMutedSvg from '@components/svgs/SoundMutedSvg';
import SoundLowSvg from '@components/svgs/SoundLowSvg';
import SoundHighSvg from '@components/svgs/SoundHighSvg';
import PauseSvg from '@components/svgs/PauseSvg';
import PlaySvg from '@components/svgs/PlaySvg';
import RangeInput from '@components/RangeInput';

type PlayContextType = {
  isPlay: boolean;
  togglePlay: () => void;
};

type VolumeContextType = {
  volume: number;
  toggleMute: () => void;
  updateVolume: (value: number) => void;
};

type PipContextType = {
  isPip: boolean;
  togglePip: () => void;
};

type FullscreenContextType = {
  isFullscreen: boolean;
  startFullscreen: () => void;
  exitFullscreen: () => void;
};

const PlayContext = createContext<PlayContextType>({
  isPlay: false,
  togglePlay: () => {},
});

const VolumeContext = createContext<VolumeContextType>({
  volume: 0,
  toggleMute: () => {},
  updateVolume: () => {},
});

const PipContext = createContext<PipContextType>({
  isPip: false,
  togglePip: () => {},
});

const FullscreenContext = createContext<FullscreenContextType>({
  isFullscreen: false,
  startFullscreen: () => {},
  exitFullscreen: () => {},
});

const usePlayContext = () => {
  const { isPlay, togglePlay } = useContext(PlayContext);
  return useMemo(() => ({ isPlay, togglePlay }), [isPlay, togglePlay]);
};

const useVolumeContext = () => {
  const { volume, updateVolume, toggleMute } = useContext(VolumeContext);
  return useMemo(() => ({ volume, updateVolume, toggleMute }), [volume, updateVolume, toggleMute]);
};

const usePipContext = () => {
  const { isPip, togglePip } = useContext(PipContext);
  return useMemo(() => ({ isPip, togglePip }), [isPip, togglePip]);
};

const useFullscreenContext = () => {
  const { isFullscreen, startFullscreen, exitFullscreen } = useContext(FullscreenContext);

  return useMemo(
    () => ({
      isFullscreen,
      startFullscreen,
      exitFullscreen,
    }),
    [isFullscreen, startFullscreen, exitFullscreen],
  );
};

type Props = PropsWithChildren<{
  value: PlayContextType & VolumeContextType & PipContextType & FullscreenContextType;
}>;

const VideoControllerProvider = ({
  children,
  value: {
    isFullscreen,
    volume,
    isPip,
    isPlay,
    startFullscreen,
    exitFullscreen,
    togglePip,
    togglePlay,
    toggleMute,
    updateVolume,
  },
}: Props) => {
  return (
    <FullscreenContext.Provider value={{ isFullscreen, startFullscreen, exitFullscreen }}>
      <PipContext.Provider value={{ isPip, togglePip }}>
        <VolumeContext.Provider value={{ volume, updateVolume, toggleMute }}>
          <PlayContext.Provider value={{ isPlay, togglePlay }}>{children}</PlayContext.Provider>
        </VolumeContext.Provider>
      </PipContext.Provider>
    </FullscreenContext.Provider>
  );
};

type VideoControllerWrapperProps = PropsWithChildren<{
  isShowControls: boolean;
}>;

const VideoControllerWrapper = ({ children, isShowControls }: VideoControllerWrapperProps) => {
  const { isLivePage } = useLiveContext();
  return (
    <div
      className={clsx(
        'funch-overlay absolute bottom-0 left-0 right-0 top-0 px-3.5 pb-2.5 pt-3.5',
        isShowControls ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className={clsx('flex h-full w-full flex-col', isLivePage ? 'justify-between' : 'justify-end')}>
        {isLivePage && (
          <div className="w-full">
            <div className="bg-surface-red-strong ml-auto flex h-6 w-14 items-center justify-center rounded-md">
              <LiveSvg />
            </div>
          </div>
        )}
        <div className="flex h-9 items-center justify-between">{children}</div>
      </div>
    </div>
  );
};

const VideoControllerBox = ({ children }: PropsWithChildren) => {
  return <div className={clsx('flex items-center')}>{children}</div>;
};

const FullscreenButton = () => {
  const { isFullscreen, startFullscreen, exitFullscreen } = useFullscreenContext();
  return (
    <VideoIconButton
      title={isFullscreen ? '전체화면 종료' : '전체화면 시작'}
      aria-label={isFullscreen ? '전체화면 종료하기' : '전체화면 시작하기'}
      onClick={() => {
        isFullscreen ? exitFullscreen() : startFullscreen();
      }}
      componentType={isFullscreen ? VIDEO_ICON_COMPONENT_TYPE.FULLSCREEN : VIDEO_ICON_COMPONENT_TYPE.DEFAULT}
    >
      {isFullscreen ? <FullscreenQuitSvg /> : <FullscreenSvg />}
    </VideoIconButton>
  );
};

const PipButton = () => {
  const { togglePip, isPip } = usePipContext();
  const { isFullscreen } = useFullscreenContext();
  return (
    <VideoIconButton
      title="PIP 모드 전환"
      aria-label={isPip ? 'PIP 모드 종료하기' : 'PIP 모드 시작하기'}
      componentType={isFullscreen ? VIDEO_ICON_COMPONENT_TYPE.FULLSCREEN : VIDEO_ICON_COMPONENT_TYPE.DEFAULT}
      onClick={togglePip}
    >
      {isPip ? <PipQuitSvg /> : <PipSvg />}
    </VideoIconButton>
  );
};

const VolumeController = () => {
  const { volume, updateVolume, toggleMute } = useVolumeContext();
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div
      className="flex items-center gap-0.5"
      onMouseMove={() => {
        setIsHidden(false);
      }}
      onMouseLeave={() => {
        setIsHidden(true);
      }}
    >
      <VideoIconButton
        componentType="DEFAULT"
        onClick={toggleMute}
        title={volume === 0 ? '음소거 해제' : '음소거'}
        aria-label={volume === 0 ? '음소거 해제하기' : '음소거하기'}
      >
        <VolumeSvg volume={volume} />
      </VideoIconButton>
      <div
        className={clsx('overflow-hidden transition-all duration-300', {
          'w-0': isHidden,
          'w-24': !isHidden,
        })}
      >
        <div className="px-4">
          <RangeInput min={0} max={100} step={1} value={volume} updateValue={updateVolume} />
        </div>
      </div>
    </div>
  );
};

const VolumeSvg = ({ volume }: { volume: number }) => {
  const renderedVolumeIcon = () => {
    switch (true) {
      case volume === 0:
        return <SoundMutedSvg />;

      case volume > 0 && volume <= 50:
        return <SoundLowSvg />;

      default:
        return <SoundHighSvg />;
    }
  };

  return <>{renderedVolumeIcon()}</>;
};

const PlayButton = () => {
  const { togglePlay, isPlay } = usePlayContext();
  const { isFullscreen } = useFullscreenContext();
  return (
    <VideoIconButton
      title={isPlay ? '정지' : '재생'}
      aria-label={isPlay ? '영상 정지하기' : '영상 재생하기'}
      componentType={isFullscreen ? VIDEO_ICON_COMPONENT_TYPE.FULLSCREEN : VIDEO_ICON_COMPONENT_TYPE.DEFAULT}
      onClick={togglePlay}
    >
      {isPlay ? <PauseSvg /> : <PlaySvg />}
    </VideoIconButton>
  );
};

const VideoController = Object.assign(VideoControllerProvider, {
  Wrapper: VideoControllerWrapper,
  Box: VideoControllerBox,
  Fullscreen: FullscreenButton,
  Pip: PipButton,
  Play: PlayButton,
  Volume: VolumeController,
});

export default VideoController;
