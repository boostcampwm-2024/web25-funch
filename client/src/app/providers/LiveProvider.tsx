'use client';

import NoLiveContent from '@app/(domain)/features/live/NoLiveContent';
import ErrorBoundary from '@components/ErrorBoundary';
import useLiveContext from '@hooks/useLiveContext';
import { getPlaylist } from '@libs/actions';
import { TANSTACK_QUERY_KEY } from '@libs/constants';
import type { Broadcast, Playlist } from '@libs/internalTypes';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import { createContext, Suspense, useEffect, useState, type PropsWithChildren } from 'react';

type LiveContextType = {
  isLivePage: boolean;
  liveInfo: Broadcast;
  liveUrl: Playlist['playlistUrl'] | null;
  broadcastId: string;
  clear: () => void;
  refreshLiveInfo: (updatedBroadcast: Broadcast) => void;
  injectPlaylistData: (playlist: Playlist) => void;
};

const defaultLiveInfo: Broadcast = {
  broadcastId: '',
  title: '',
  contentCategory: '',
  moodCategory: '',
  tags: [],
  thumbnailUrl: '',
  viewerCount: 0,
  userName: '',
  profileImageUrl: '',
};

export const LiveContext = createContext<LiveContextType | null>(null);

const LiveProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isLivePage = pathname.split('/')[1] === 'lives';
  const { id } = useParams() as { id: string };

  const [liveInfo, setLiveInfo] = useState<Broadcast>(defaultLiveInfo);
  const [liveUrl, setLiveUrl] = useState<Playlist['playlistUrl'] | null>(null);
  const [broadcastId, setBroadcastId] = useState<string | null>(null);

  const clear = () => {
    setLiveInfo(defaultLiveInfo);
    setLiveUrl(null);
    setBroadcastId(null);
  };

  const refreshLiveInfo = (updatedBroadcast: Broadcast) => {
    setLiveInfo(updatedBroadcast);
  };

  const injectPlaylistData = (playlist: Playlist) => {
    setLiveUrl(playlist.playlistUrl);
    setLiveInfo(playlist.broadcastData);
  };

  useEffect(() => {
    if (id) {
      setBroadcastId(id);
    }
  }, [id]);

  return (
    <LiveContext.Provider
      value={{
        isLivePage,
        liveInfo,
        liveUrl,
        broadcastId: broadcastId || '',
        clear,
        refreshLiveInfo,
        injectPlaylistData,
      }}
    >
      {broadcastId !== null && (
        <LiveFunnel
          key={broadcastId} // 오류가 발생하고 다른 방송에 접근했을 때 이전에 fallback된 에러 컴포넌트가 계속 렌더링되는 문제 관련
          broadcastId={broadcastId}
          isLivePage={isLivePage}
        >
          {children}
        </LiveFunnel>
      )}
    </LiveContext.Provider>
  );
};

const LiveFunnel = ({
  children,
  broadcastId,
  isLivePage,
}: PropsWithChildren<{
  broadcastId: string;
  isLivePage: boolean;
}>) => {
  return (
    <ErrorBoundary fallback={<ErrorFallback isLivePage={isLivePage} />}>
      <Suspense
        fallback={
          <div className="h-live-section flex w-full items-center justify-center">
            <p className="funch-bold20 text-content-neutral-strong">방송을 불러오는 중...</p>
          </div>
        }
      >
        <PlaylistFetcher broadcastId={broadcastId}>{children}</PlaylistFetcher>
      </Suspense>
    </ErrorBoundary>
  );
};

const ErrorFallback = ({ isLivePage }: { isLivePage: boolean }) => {
  if (!isLivePage) return null;

  return <NoLiveContent />;
};

const PlaylistFetcher = ({ broadcastId, children }: PropsWithChildren<{ broadcastId: string }>) => {
  const { data } = useSuspenseQuery({
    queryKey: [TANSTACK_QUERY_KEY.LIVE, broadcastId],
    queryFn: () => getPlaylist(broadcastId),
  });

  return <Injector playlist={data}>{children}</Injector>;
};

const Injector = ({
  children,
  playlist,
}: PropsWithChildren<{
  playlist: Playlist;
}>) => {
  const { injectPlaylistData } = useLiveContext();
  useEffect(() => {
    injectPlaylistData(playlist);
  }, [playlist]);

  return children;
};

export default LiveProvider;
