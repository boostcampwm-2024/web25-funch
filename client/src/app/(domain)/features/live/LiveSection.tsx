'use client';

import ChatFoldSvg from '@components/svgs/ChatFoldSvg';
import DottedSvg from '@components/svgs/DottedSvg';
import Button from '@components/Button';
import Live from './Live';
import useLiveContext from '@hooks/useLiveContext';
import NoLiveContent from './NoLiveContent';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import VideoController from './VideoController';

const LiveSection = () => {
  const { isLivePage, liveId } = useLiveContext();
  // ** lives 페이지라면 [id]에 해당하는 스트리밍 중인 방송이 있는지 확인하여
  // 없으면 NoLiveContent를 보여주고,(liveId를 null로)
  // 있으면 확장된 Live 섹션을 보여준다.(liveId를 id로)
  // ** lives 페이지가 아니라면,
  // liveId가 존재하는 경우 앱 pip 모드로 전환하여 방송을 계속 보여주고,
  // liveId가 존재하지 않는 경우 아무것도 보여주지 않는다.

  // 1. isLivePage 확인

  // if livePage === true
  // 2.1 [id] 확인
  // 2.2 [id]에 해당하는 방송이 있는지 확인

  // if isStreaming === true
  // 3.1 Live 컴포넌트 렌더링 (확장된 Live 섹션)
  // 3.2 liveId를 [id]로 설정

  // if isStreaming === false
  // 3.1 NoLiveContent 렌더링
  // 3.2 liveId를 null로 설정

  // if livePage === false
  // 2.1 liveId 확인

  // if liveId !== null
  // 3.1 pip 모드로 전환
  // 3.2 방송 계속 보여주기

  // if liveId === null
  // 3.1 아무것도 보여주지 않기

  if (!isLivePage && liveId === null) return null;

  if (isLivePage && liveId === null) return <NoLiveContent />;

  return (
    <Wrapper>
      {/*
       *** !isLivePage && liveId === null -> null
       *** 나머지 = children?
       */}
      <Live>
        {({
          videoRef,
          videoWrapperRef,
          isShowControls,
          isPip,
          isPlay,
          toggleMute,
          togglePlay,
          togglePip,
          isFullscreen,
          startFullscreen,
          exitFullscreen,
          volume,
          updateVolume,
        }) => (
          <Live.Wrapper>
            <Live.VideoWrapper ref={videoWrapperRef} isShowControls={isShowControls} isFullscreen={isFullscreen}>
              <Live.Video ref={videoRef} />
              <VideoController
                value={{
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
                }}
              >
                <VideoController.Wrapper isShowControls={isShowControls}>
                  <VideoController.Box>
                    <VideoController.Play />
                    <VideoController.Volume />
                  </VideoController.Box>
                  {isLivePage && (
                    <VideoController.Box>
                      <VideoController.Pip />
                      <VideoController.Fullscreen />
                    </VideoController.Box>
                  )}
                </VideoController.Wrapper>
              </VideoController>
            </Live.VideoWrapper>
            {isLivePage && <Live.Info />}
          </Live.Wrapper>
        )}
      </Live>
      {isLivePage && (
        <aside className={clsx('flex h-full w-[22rem] flex-col', 'border-border-neutral-weak border-x border-solid')}>
          <div className={clsx('flex h-11 w-full items-center justify-between border-y', 'border-border-neutral-weak')}>
            <ChatFoldSvg />
            <strong className={clsx('text-content-neutral-primary')}>채팅</strong>
            <DottedSvg />
          </div>
          <div className="flex flex-1 flex-col"></div>
          <div className="flex h-[82px] flex-col px-[10px]">
            <div className="h-10 w-full">
              <input
                className={clsx(
                  'h-full w-full resize-none rounded-md border-none px-2 py-2',
                  'bg-surface-neutral-weak',
                )}
                placeholder="채팅을 입력해주세요"
              />
            </div>
            <div className="flex justify-end py-1">
              <Button>채팅</Button>
            </div>
          </div>
        </aside>
      )}
    </Wrapper>
  );
};

const Wrapper = ({ children }: PropsWithChildren) => {
  const { isLivePage } = useLiveContext();
  return (
    <section
      className={clsx({
        'h-live-section relative w-full': isLivePage,
        'h-live-pip w-live-pip fixed bottom-20 right-20': !isLivePage,
      })}
    >
      <div
        className={clsx({
          'h-full w-full': true,
          'grid grid-cols-[1fr,22rem]': isLivePage,
          block: !isLivePage,
        })}
      >
        {children}
      </div>
    </section>
  );
};

export default LiveSection;