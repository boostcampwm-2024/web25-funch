'use client';

import { getSearchResult } from '@libs/actions';
import { Broadcast, User2 } from '@libs/internalTypes';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useContext, createContext, PropsWithChildren, use } from 'react';
import Lives from '@components/livesGrid/Lives';
import clsx from 'clsx';
import { OfflineItems } from '@app/(domain)/following/features/FollowingOffair';

type SearchContextType = {
  searchLives: Broadcast[];
  searchUsers: User2[];
  isLoading: boolean;
};

const SearchContext = createContext<SearchContextType | null>(null);

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('SearchContext must be used within SearchProvider');
  }
  return context;
};

const SearchController = ({ children }: PropsWithChildren) => {
  const query = useSearchParams().get('query');
  const [isLoading, setIsLoading] = useState(true);
  const [searchLives, setSearchLives] = useState<Broadcast[]>([]);
  const [searchUsers, setSearchUsers] = useState<User2[]>([]);

  const getSearchResults = async () => {
    if (query) {
      const res = await getSearchResult(query as string);

      setSearchLives(res.lives);
      setSearchUsers(res.members);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <SearchContext.Provider value={{ searchLives, searchUsers, isLoading }}>
      <div className="flex w-full flex-col">{children}</div>
    </SearchContext.Provider>
  );
};

const SearchLives = () => {
  const { isLoading, searchLives } = useSearchContext();

  if (isLoading) {
    return null;
  }

  return (
    <div className={clsx('mb-4 w-full')}>
      <div className={clsx('mb-2 flex items-center justify-between')}>
        <h2 className={clsx('text-content-neutral-primary funch-bold20')}>라이브 중인 방송</h2>
      </div>
      <Lives lives={searchLives}>
        {({ visibleLives, isExpanded, toggle }) => (
          <>
            <Lives.List>
              {visibleLives.map((live, index) => (
                <Lives.Live key={live.broadcastId} live={live} isPriority={index === 0} />
              ))}
            </Lives.List>
            {searchLives.length > 3 && <Lives.Expand isExpanded={isExpanded} toggle={toggle} />}
          </>
        )}
      </Lives>
    </div>
  );
};

const Users = () => {
  const { isLoading, searchUsers } = useSearchContext();

  if (isLoading) {
    return null;
  }

  return (
    <div className={clsx('w-full')}>
      <div className={clsx('mb-2 flex items-center justify-between')}>
        <h2 className={clsx('text-content-neutral-primary funch-bold20')}>오프라인</h2>
      </div>
      <OfflineItems offlines={searchUsers} />
    </div>
  );
};

const SearchContainer = Object.assign(SearchController, {
  Live: SearchLives,
  User: Users,
});

export default SearchContainer;
