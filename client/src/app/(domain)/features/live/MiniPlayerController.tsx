'use client';

import useInternalRouter from '@hooks/useInternalRouter';
import useLiveContext from '@hooks/useLiveContext';
import clsx from 'clsx';
import VideoIconButton from './VideoIconButton';
import MiniPlayerRevertSvg from '@components/svgs/MiniPlayerRevertSvg';
import MiniPlayerCloseSvg from '@components/svgs/MiniPlayerCloseSvg';
import { VIDEO_ICON_COMPONENT_TYPE } from '@libs/constants';

const MiniPlayerController = () => {
  const { liveInfo, clear } = useLiveContext();
  const { push } = useInternalRouter();
  const handleClick = (boradcastId: string) => {
    push(`/lives/${boradcastId}`);
  };
  return (
    <div
      className={clsx(
        'absolute bottom-full right-0 px-2.5 py-1',
        'bg-surface-neutral-primary',
        'rounded-tl-xl rounded-tr-xl',
      )}
    >
      <div className={clsx('flex h-9 gap-2')}>
        <VideoIconButton
          aria-label="기존 방송 화면으로 돌아가기"
          title="돌아가기"
          onClick={() => handleClick(liveInfo.broadcastId)}
          componentType={VIDEO_ICON_COMPONENT_TYPE.MINI_PLAYER}
        >
          <MiniPlayerRevertSvg />
        </VideoIconButton>
        <VideoIconButton
          aria-label="방송 닫기"
          title="닫기"
          onClick={() => clear()}
          componentType={VIDEO_ICON_COMPONENT_TYPE.MINI_PLAYER}
        >
          <MiniPlayerCloseSvg />
        </VideoIconButton>
      </div>
    </div>
  );
};

export default MiniPlayerController;
