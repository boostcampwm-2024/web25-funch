'use client';

import ChatFoldSvg from '@components/svgs/ChatFoldSvg';
import DottedSvg from '@components/svgs/DottedSvg';

import Live from './Live';
import useLiveContext from '@hooks/useLiveContext';
import NoLiveContent from './NoLiveContent';
import clsx from 'clsx';

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
    <section
      className={clsx(isLivePage ? 'h-live-section relative w-full' : 'h-live-pip w-live-pip fixed bottom-20 right-20')}
    >
      {/*
        !isLivePage && liveId === null -> null

        나머지 = children?
      */}
      <Live>
        {({ videoRef, videoWrapperRef, toggleMute, play, pause, fullscreen, pip, volume, handleChangeVolume }) => (
          <div className={clsx('h-full w-full', isLivePage ? 'grid grid-cols-[1fr,22rem]' : 'block')}>
            <div className="funch-scrollable w-full">
              <Live.VideoWrapper ref={videoWrapperRef}>
                <Live.Video ref={videoRef} />
                <Live.VideoControllersWrapper>
                  <Live.Play play={play} />
                  <Live.Pause pause={pause} />
                  <Live.Mute toggleMute={toggleMute} />
                  <Live.Volume volume={volume} handleChangeVolume={handleChangeVolume} />
                  <Live.Pip pip={pip} />
                  <Live.Fullscreen fullscreen={fullscreen} />
                </Live.VideoControllersWrapper>
              </Live.VideoWrapper>
              {isLivePage && <Live.Info />}
            </div>
            {isLivePage && (
              <aside className={clsx('flex h-full w-[22rem] flex-col')}>
                <div className="flex h-11 w-full items-center justify-between border-y-[1px]">
                  <ChatFoldSvg />
                  <strong>채팅</strong>
                  <DottedSvg />
                </div>
                <div className="flex flex-1 flex-col"></div>
                <div className="h-[82px] px-[10px] py-5">
                  <div className="h-8 w-full py-3">
                    <textarea className="rounded-md" placeholder="채팅을 입력해주세요"></textarea>
                  </div>
                  <div className="flex h-8 justify-end">채팅</div>
                </div>
              </aside>
            )}
          </div>
        )}
      </Live>
    </section>
  );
};

export default LiveSection;
