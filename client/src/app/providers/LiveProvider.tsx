'use client';

import NoLiveContent from '@app/(domain)/features/live/NoLiveContent';
import ErrorBoundary from '@components/ErrorBoundary';
import useLiveContext from '@hooks/useLiveContext';
import { getPlaylist } from '@libs/actions';
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

  // const [savedId, setSavedId] = useState<string | null>(null);

  const [liveUrl, setLiveUrl] = useState<Playlist['playlistUrl'] | null>(null);

  const [broadcastId, setBroadcastId] = useState<string | null>(null);

  const clear = () => {
    setLiveInfo(defaultLiveInfo);
    setLiveUrl(null);
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
        <ErrorBoundary fallback={<NoLiveContent />}>
          <Suspense fallback={<p>로딩 중</p>}>
            <PlaylistFetcher broadcastId={broadcastId}>{children}</PlaylistFetcher>
          </Suspense>
        </ErrorBoundary>
      )}
    </LiveContext.Provider>
  );
};

const PlaylistFetcher = ({ broadcastId, children }: PropsWithChildren<{ broadcastId: string }>) => {
  const { injectPlaylistData } = useLiveContext();
  const { data } = useSuspenseQuery({
    queryKey: ['live', broadcastId],
    queryFn: () => getPlaylist(broadcastId),
  });

  useEffect(() => {
    if (data) {
      injectPlaylistData(data);
    }
  }, [data]);

  return children;
};

export default LiveProvider;
