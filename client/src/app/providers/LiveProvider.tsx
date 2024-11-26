'use client';

import { getPlaylist } from '@libs/actions';
import type { Broadcast, Playlist } from '@libs/internalTypes';
import { useParams, usePathname } from 'next/navigation';
import { createContext, useEffect, useState, type PropsWithChildren } from 'react';

type LiveContextType = {
  isLivePage: boolean;
  liveInfo: Broadcast;
  liveUrl: Playlist['playlistUrl'] | null;
  broadcastId: string;
  clear: () => void;
  refreshLiveInfo: (updatedBroadcast: Broadcast) => void;
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

  const [liveInfo, setLiveInfo] = useState<Broadcast>(defaultLiveInfo);

  const { id } = useParams() as { id: string };
  const [savedId, setSavedId] = useState<string | null>(null);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [liveUrl, setLiveUrl] = useState<Playlist['playlistUrl'] | null>(null);

  const [broadcastId, setBroadcastId] = useState<string>('');

  const clear = () => {
    setLiveInfo(defaultLiveInfo);
    setLiveUrl(null);
  };

  const refreshLiveInfo = (updatedBroadcast: Broadcast) => {
    setLiveInfo(updatedBroadcast);
  };

  /*
  isLivePage <- 이거 확인할 수 있어야 함.
  [id] -> 뭔가 패칭? id 값으로 streaming중인지 아닌지? <- 이때 방송 정보들도 불러와야 하나...?
  같이 주는것도 있고? streaming 중인지만 주는 api도 있으면 좋을거같다
  -> live infromation도 여기서 관리?

  ** 스트리밍 중이면?

  /lives <- 홈으로 rewrite ✅

  isLivePage <- usePathname + 이것저것 split, index로 접근해서, 어쩌고 저쩌고

  !isLivePage && liveId === nulll
  => nothing

  isLivePage && liveId === null
  => useParam으로 fetch 해봤는데 !isStreaming ======> NoLiveContent 렌더링

  isLivePage && liveId !== null
  => 확장된 live 섹션을 보여줘요.

  !isLivePage && liveId !== null
  => 앱 내 pip 모드로 전환해서 방송 계속 보여줘요.
  
  */

  useEffect(() => {
    const fetchLive = async (id: string) => {
      try {
        if (!id) return;
        if (id === savedId) return;

        setIsLoading(true);

        const fetchedPlaylist = await getPlaylist(id);

        setLiveUrl(fetchedPlaylist.playlistUrl);
        setLiveInfo(fetchedPlaylist.broadcastData);
        setSavedId(id);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setLiveUrl(null);
        setLiveInfo(defaultLiveInfo);
      } finally {
        setBroadcastId(id);
      }
    };

    if (isLivePage) {
      // id로 스트리밍 중인 방송이 있는지 확인
      fetchLive(id);
    }
  }, [id, isLivePage, savedId]);

  return (
    <LiveContext.Provider
      value={{
        isLivePage,
        liveInfo,
        liveUrl,
        broadcastId,
        clear,
        refreshLiveInfo,
      }}
    >
      {isError ? <p>에러 아님</p> : isLivePage && isLoading ? <p>방송을 불러오는 중</p> : children}
    </LiveContext.Provider>
  );
};

export default LiveProvider;
