'use client';

import ErrorBoundary from '@components/ErrorBoundary';
import useHls from '@hooks/useHls';
import useUser from '@hooks/useUser';
import { getPlaylist, getStreamInfo } from '@libs/actions';
import { TANSTACK_QUERY_KEY } from '@libs/constants';
import { Playlist } from '@libs/internalTypes';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { type PropsWithChildren, Suspense, useEffect, useRef, useState } from 'react';

const StudioVideo = () => {
  return (
    <ErrorBoundary fallback={<FallbackWrapper>회원 정보를 불러올 수 없어요.</FallbackWrapper>}>
      <StreamInfoRefresher />
    </ErrorBoundary>
  );
};

const StreamInfoRefresher = () => {
  const {
    data: { broadcast_id: broadcastId },
  } = useSuspenseQuery({
    queryKey: [TANSTACK_QUERY_KEY.STUDIO_STREAM_INFO],
    queryFn: async () => await getStreamInfo(),
  });

  return <BroadcastIdUpdater broadcastId={broadcastId} />;
};

const BroadcastIdUpdater = ({ broadcastId }: { broadcastId: string }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const { updateBroadcastId } = useUser();
  useEffect(() => {
    updateBroadcastId(broadcastId);
    setIsUpdated(true);
  }, [broadcastId]);

  if (!isUpdated) return null;

  return <BroadcastIdReader />;
};

const BroadcastIdReader = () => {
  const { loggedinUser } = useUser();

  if (!loggedinUser?.broadcastId) {
    return <FallbackWrapper>방송을 불러올 수 없어요.</FallbackWrapper>;
  }

  return (
    <Suspense fallback={<FallbackWrapper>플레이 리스트를 불러오는 중...</FallbackWrapper>}>
      <ErrorBoundary fallback={<NoPlaylist />}>
        <PlaylistFetcher broadcastId={loggedinUser.broadcastId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const PlaylistFetcher = ({ broadcastId }: { broadcastId: string }) => {
  const {
    data: { playlistUrl },
  } = useSuspenseQuery({
    queryKey: [TANSTACK_QUERY_KEY.STUDIO_PLAYLIST, broadcastId],
    queryFn: async () => await getPlaylist(broadcastId),
  });

  return <Video playlistUrl={playlistUrl} />;
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

export const FallbackWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <p className="funch-bold16 text-content-neutral-strong absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </p>
    </div>
  );
};

const NoPlaylist = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
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

const VideoBuffering = () => {
  return <VideoExceptionWrapper>비디오 청크를 정성들여 만드는 중...</VideoExceptionWrapper>;
};

const VideoLoading = () => {
  return <VideoExceptionWrapper>로딩 중...</VideoExceptionWrapper>;
};

const VideoError = () => {
  return <VideoExceptionWrapper>비디오를 불러오는 중에 에러가 발생했어요.</VideoExceptionWrapper>;
};

export const VideoExceptionWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-bg-video-buffer z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <p className="funch-bold20 text-content-static-coolgray">{children}</p>
    </div>
  );
};

export const StudioVideoWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className={clsx('pt-live-aspect-ratio relative w-full')}>
      <div className={clsx('bg-surface-static-black absolute left-0 top-0 h-full w-full')}>{children}</div>;
    </div>
  );
};

export default StudioVideo;
