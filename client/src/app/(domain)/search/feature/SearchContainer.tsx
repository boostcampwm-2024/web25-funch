'use client';

import { getSearchResult } from '@libs/actions';
import { Broadcast, User2 } from '@libs/internalTypes';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useContext, createContext, PropsWithChildren, use } from 'react';

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
  const params = useSearchParams().get('params');
  const [isLoading, setIsLoading] = useState(true);
  const [searchLives, setSearchLives] = useState<Broadcast[]>([]);
  const [searchUsers, setSearchUsers] = useState<User2[]>([]);

  const getSearchResults = async () => {
    if (params) {
      const res = await getSearchResult(params as string);

      console.log(res);

      setSearchLives(res.lives);
      setSearchUsers(res.users);
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

const Lives = () => {
  const { isLoading, searchLives } = useSearchContext();

  if (isLoading) {
    return null;
  }

  return (
    <div className="h-20 w-full">
      {searchLives.map((live) => (
        <div key={live.broadcastId}>{live.title}</div>
      ))}
    </div>
  );
};

const Users = () => {
  const { isLoading, searchUsers } = useSearchContext();

  if (isLoading) {
    return null;
  }

  useEffect(() => {
    if (!isLoading) {
      console.log(searchUsers);
    }
  }, [isLoading]);

  return (
    <div>
      {searchUsers.map((user) => (
        <div key={user.broadcast_id}>{user.name}</div>
      ))}
    </div>
  );
};

const SearchContainer = Object.assign(SearchController, {
  Live: Lives,
  User: Users,
});

export default SearchContainer;
