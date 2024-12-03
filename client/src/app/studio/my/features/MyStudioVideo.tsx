'use client';

import ErrorBoundary from '@components/ErrorBoundary';
import useHls from '@hooks/useHls';
import useUser from '@hooks/useUser';
import { getPlaylist, getStreamInfo } from '@libs/actions';
import { TANSTACK_QUERY_KEY } from '@libs/constants';
import type { Broadcast, Playlist } from '@libs/internalTypes';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { createContext, type PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

type MyStudioVideoContextType = {
  playlistUrl: Playlist['playlistUrl'] | null;
  injectPlaylistUrl: (playlistUrl: Playlist['playlistUrl']) => void;
};

const MyStudioVideoContext = createContext<MyStudioVideoContextType | null>(null);

const useMyStudioVideo = () => {
  const context = useContext(MyStudioVideoContext);
  if (!context) {
    throw new Error('useMyStudioVideo must be used within a MyStudioVideoProvider');
  }
  return context;
};

const MyStudioVideo = () => {
  const [playlistUrl, setPlaylistUrl] = useState<Playlist['playlistUrl'] | null>(null);

  const injectPlaylistUrl = (playlistUrl: Playlist['playlistUrl']) => {
    setPlaylistUrl(playlistUrl);
  };

  return (
    <Wrapper>
      <MyStudioVideoContext.Provider value={{ playlistUrl, injectPlaylistUrl }}>
        <ErrorBoundary fallback={<FallbackWrapper>회원 정보를 불러올 수 없어요.</FallbackWrapper>}>
          <BroadcastIdRefresher>
            <BroadcastIdSender />
          </BroadcastIdRefresher>
        </ErrorBoundary>
      </MyStudioVideoContext.Provider>
    </Wrapper>
  );
};

const FallbackWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <p className="funch-bold16 text-content-neutral-strong absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </p>
    </div>
  );
};

const BroadcastIdRefresher = ({ children }: PropsWithChildren) => {
  const { updateBroadcastId } = useUser();
  const { data, isLoading, isError } = useQuery({
    queryKey: [TANSTACK_QUERY_KEY.STUDIO_STREAM_INFO],
    queryFn: () => getStreamInfo(),
  });

  useEffect(() => {
    if (data) {
      updateBroadcastId(data.broadcast_id);
    }
  }, [data, updateBroadcastId]);

  if (isError) {
    throw Error('스트리머 정보를 불러오는 중 에러가 발생했어요.');
  }

  if (isLoading || !data) {
    return <FallbackWrapper>스트리머 정보 갱신 중...</FallbackWrapper>;
  }

  return children;
};

const BroadcastIdSender = () => {
  const { loggedinUser } = useUser();

  if (!loggedinUser?.broadcastId) {
    return <div>방송이 없어요</div>;
  }

  return (
    <ErrorBoundary
      fallback={
        <FallbackWrapper>
          <NoPlaylist />
        </FallbackWrapper>
      }
    >
      <PlaylistFetcher broadcastId={loggedinUser.broadcastId} />
    </ErrorBoundary>
  );
};

const NoPlaylist = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="funch-medium16 text-content-static-white">방송 정보를 불러올 수 없어요.</p>
      <Link
        className="funch-bold14 text-content-static-warmgray hover:text-content-static-coolgray rounded-md px-1.5 py-0.5"
        href="/studio"
      >
        방송 설정하러 가기
      </Link>
    </div>
  );
};

const PlaylistFetcher = ({ broadcastId }: { broadcastId: Broadcast['broadcastId'] }) => {
  const { playlistUrl, injectPlaylistUrl } = useMyStudioVideo();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['my-studio-playlist', broadcastId],
    queryFn: () => getPlaylist(broadcastId),
  });

  useEffect(() => {
    if (data) {
      injectPlaylistUrl(data.playlistUrl);
    }
  }, [data, injectPlaylistUrl]);

  if (isError) {
    throw Error('플레이 리스트를 불러오는 중 에러가 발생했어요.');
  }

  if (isLoading || !data || !playlistUrl) {
    return <FallbackWrapper>플레이 리스트를 불러오는 중...</FallbackWrapper>;
  }

  return <Video playlistUrl={playlistUrl} />;
};

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className={clsx('pt-live-aspect-ratio relative w-full')}>
      <div className={clsx('bg-surface-static-black absolute left-0 top-0 h-full w-full')}>{children}</div>
    </div>
  );
};

const Video = ({ playlistUrl }: { playlistUrl: Playlist['playlistUrl'] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isBuffering, isError, isLoading } = useHls({
    videoRef,
    liveUrl: playlistUrl,
  });

  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <video
        ref={videoRef}
        muted
        className="bg-surface-static-black absolute left-0 top-0 h-full w-full"
        controlsList="nodownload"
        playsInline
      />
      {isError ? <VideoError /> : isBuffering ? <VideoBuffering /> : isLoading ? <VideoLoading /> : null}
    </div>
  );
};

const VideoBuffering = () => {
  return (
    <div className="bg-bg-video-buffer z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <p className="funch-bold20 text-content-static-coolgray">비디오 청크를 정성들여 만드는 중...</p>
    </div>
  );
};

const VideoLoading = () => {
  return (
    <div className="bg-bg-video-buffer z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <p className="funch-bold20 text-content-static-coolgray">로딩 중...</p>
    </div>
  );
};

const VideoError = () => {
  return (
    <div className="bg-bg-video-buffer z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <p className="funch-bold20 text-content-static-coolgray">비디오를 불러오는 중에 에러가 발생했어요.</p>
    </div>
  );
};

export default MyStudioVideo;
