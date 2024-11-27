'use client';

import Live from './Live';
import useLiveContext from '@hooks/useLiveContext';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import VideoController from './VideoController';
import MiniPlayerController from './MiniPlayerController';
import Chat from './Chat';
import LiveInfo from './LiveInfo';
import useFollowingLives from '@hooks/useFollowingLives';
import useUserContext from '@hooks/useUserContext';
import useUser from '@hooks/useUser';

const LiveSection = () => {
  const { isLivePage, liveUrl } = useLiveContext();
  const { ids, refetchLives } = useFollowingLives();
  const { userSession } = useUserContext();
  const { isLoggedin } = useUser();

  const myId = userSession?.user?.broadcastId || '';

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

  // if (liveUrl === null) {
  //   if (!isLivePage) return null;
  //   else return <NoLiveContent />;
  // }

  if (liveUrl === null) return null;

  return (
    <Wrapper>
      {/*
       *** !isLivePage && liveId === null -> null
       *** 나머지 = children?
       */}
      <Live liveUrl={liveUrl}>
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
          isBuffering,
          isError,
          isLoading,
        }) => (
          <Live.Wrapper>
            <Live.VideoWrapper ref={videoWrapperRef} isShowControls={isShowControls} isFullscreen={isFullscreen}>
              <Live.Video ref={videoRef} isBuffering={isBuffering} isError={isError} isLoading={isLoading} />
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
            {isLivePage && (
              <LiveInfo>
                {({ liveInfo }) => (
                  <>
                    <LiveInfo.Title title={liveInfo.title} />
                    <LiveInfo.Wrapper>
                      <LiveInfo.ProfileImage profileImageUrl={liveInfo.profileImageUrl} userName={liveInfo.userName} />
                      <LiveInfo.Description>
                        <LiveInfo.UserName userName={liveInfo.userName} />
                        <LiveInfo.Tags
                          tags={liveInfo.tags}
                          contentCategory={liveInfo.contentCategory}
                          moodCategory={liveInfo.moodCategory}
                        />
                        <LiveInfo.ViewerCount viewerCount={liveInfo.viewerCount} />
                      </LiveInfo.Description>
                      <LiveInfo.FollowButton
                        ids={ids}
                        broadcastId={liveInfo.broadcastId}
                        myId={myId}
                        isloggedin={isLoggedin}
                        refetchLives={refetchLives}
                      />
                    </LiveInfo.Wrapper>
                  </>
                )}
              </LiveInfo>
            )}
          </Live.Wrapper>
        )}
      </Live>
      <Chat>
        {({ chatList, socketRef, chatname, sendChat, isLoading, isError }) => (
          <>
            {isError ? (
              <Chat.Error />
            ) : isLoading ? (
              <Chat.Loading />
            ) : (
              <>
                <Chat.List chatList={chatList} />
                <Chat.Form socketRef={socketRef} chatname={chatname} sendChat={sendChat} />
              </>
            )}
          </>
        )}
      </Chat>
    </Wrapper>
  );
};

const Wrapper = ({ children }: PropsWithChildren) => {
  const { isLivePage } = useLiveContext();
  return (
    <section
      className={clsx({
        'h-live-section relative w-full': isLivePage,
        'h-live-pip w-live-pip fixed bottom-20 right-20 z-[9999]': !isLivePage,
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
      {!isLivePage && <MiniPlayerController />}
    </section>
  );
};

export default LiveSection;
