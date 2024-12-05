'use client';

import { getSearchResult } from '@libs/actions';
import { Broadcast, User2 } from '@libs/internalTypes';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Lives from '@components/livesGrid/Lives';
import clsx from 'clsx';
import no_result from '@assets/no_result.png';
import Image from 'next/image';
import { OfflineItems } from '@app/(domain)/following/features/FollowingOffair';

type childrenArgs = {
  searchLives: Broadcast[];
  searchUsers: User2[];
  isLoading: boolean;
};

type Props = {
  children: (args: childrenArgs) => React.ReactNode;
};

const SearchController = ({ children }: Props) => {
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
  }, [query]);

  return (
    <div className="flex w-full flex-col items-center">
      {children({
        searchLives,
        searchUsers,
        isLoading,
      })}
    </div>
  );
};

type SearchLivesProps = {
  searchLives: Broadcast[];
  isLoading: boolean;
};

const SearchLives = ({ isLoading, searchLives }: SearchLivesProps) => {
  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (searchLives.length === 0) {
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

type UsersProps = {
  searchUsers: User2[];
  isLoading: boolean;
};

const Users = ({ searchUsers, isLoading }: UsersProps) => {
  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (searchUsers.length === 0) {
    return null;
  }

  return (
    <div className={clsx('w-full')}>
      <div className={clsx('mb-2 flex items-center')}>
        <h2 className={clsx('text-content-neutral-primary funch-bold20')}>오프라인</h2>
      </div>
      <OfflineItems offlines={searchUsers} />
    </div>
  );
};

type NoSearchResultsProps = {
  isLoading: boolean;
  searchLives: Broadcast[];
  searchUsers: User2[];
};

const NoSearchResults = ({ isLoading, searchLives, searchUsers }: NoSearchResultsProps) => {
  if (isLoading) return null;

  if (searchLives.length == 0 && searchUsers.length == 0) {
    return (
      <div className="min-h-home flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image src={no_result} alt="no_result" width={250} height={250} />
          <p className="text-content-neutral-primary funch-bold16">일치하는 결과가 없습니다.</p>
        </div>
      </div>
    );
  }
};

const SearchContainer = Object.assign(SearchController, {
  Live: SearchLives,
  User: Users,
  NoResults: NoSearchResults,
});

export default SearchContainer;
