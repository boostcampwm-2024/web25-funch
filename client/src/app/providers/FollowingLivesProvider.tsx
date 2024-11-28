'use client';

import React, { createContext, useState, useEffect, PropsWithChildren, useCallback } from 'react';
import { getFollowingLiveList } from '@libs/actions';
import { Broadcast, User2 } from '@libs/internalTypes';

interface FollowingLivesContextType {
  lives: Broadcast[];
  ids: string[];
  offlines: User2[];
  isLoading: boolean;
  isError: boolean;
  refetchLives: () => Promise<void>;
}

export const FollowingLivesContext = createContext<FollowingLivesContextType | undefined>(undefined);

export const FollowingLivesProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [lives, setLives] = useState<Broadcast[]>([]);
  const [offlines, setOfflines] = useState<User2[]>([]);

  const fetchLives = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const fetchedLives = await getFollowingLiveList();
      console.log('fetchedLives:', fetchedLives);
      const fetchedFollowingLives = fetchedLives.onAir.map((live) => live.broadCastData);

      console.log('fetchedFollowingLives:', fetchedFollowingLives);
      const fetchedFollowingOfflines = fetchedLives.offAir;

      console.log('fetchedFollowingOfflines:', fetchedFollowingOfflines);

      setIds(fetchedLives.onAir.map((live) => live.broadCastData.broadcastId));
      setLives(fetchedFollowingLives);
      setOfflines(fetchedFollowingOfflines);

      setIsLoading(false);
    } catch (err) {
      setLives([]);
      setIds([]);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const refetchLives = useCallback(async () => {
    await fetchLives();
  }, []);

  useEffect(() => {
    fetchLives();
  }, []);

  return (
    <FollowingLivesContext.Provider
      value={{
        lives,
        ids,
        offlines,
        isLoading,
        isError,
        refetchLives,
      }}
    >
      {children}
    </FollowingLivesContext.Provider>
  );
};
