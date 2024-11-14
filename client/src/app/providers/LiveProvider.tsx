'use client';

import { Live } from '@libs/internalTypes';
import { mockedLives } from '@mocks/lives';
import { useParams, usePathname } from 'next/navigation';
import { createContext, useEffect, useState, type PropsWithChildren } from 'react';

type LiveContextType = {
  isLivePage: boolean;
  liveId: string | null;
  liveInfo: Live;
};

const defaultLiveInfo: Live = {
  id: '',
  title: '',
  thumbnail: '',
  viewers: 0,
  isStreaming: true,
  category: '',
  tags: [],
  streamer: {
    name: '',
    profileImage: '',
  },
};

export const LiveContext = createContext<LiveContextType | null>(null);

const LiveProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isLivePage = pathname.split('/')[1] === 'lives';

  const [liveInfo, setLiveInfo] = useState<Live>(defaultLiveInfo);

  const { id } = useParams() as { id: string };

  const [isLoading, setIsLoading] = useState(false);
  // 로딩 처리 어떻게???
  const [liveId, setLiveId] = useState<string | null>(null);

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
      if (!id) return;
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const a = [null, 'ahahah'];
      const randomIndex = Math.floor(Math.random() * a.length);
      setLiveId(a[randomIndex]);
      setLiveInfo(mockedLives[1]);
      setIsLoading(false);
    };

    if (isLivePage) {
      // id로 스트리밍 중인 방송이 있는지 확인
      fetchLive(id);
    }
  }, [id, isLivePage]);

  return (
    <LiveContext.Provider
      value={{
        isLivePage,
        liveId,
        liveInfo,
      }}
    >
      {isLoading ? null : children}
    </LiveContext.Provider>
  );
};

export default LiveProvider;
