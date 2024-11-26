'use client';

import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { getFollowingLiveList } from '@libs/actions';
import { Broadcast, User2 } from '@libs/internalTypes';

interface FollowingLivesContextType {
  lives: Broadcast[];
  Ids: string[];
  offlines: User2[];
  isLoading: boolean;
  isError: boolean;
  fetchLives: () => Promise<void>;
}

export const FollowingLivesContext = createContext<FollowingLivesContextType | undefined>(undefined);

export const FollowingLivesProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [Ids, setIds] = useState<string[]>([]);
  const [lives, setLives] = useState<Broadcast[]>([]);
  const [offlines, setOfflines] = useState<User2[]>([]);

  const fetchLives = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const fetchedLives = await getFollowingLiveList();
      const fetchedFollowingLives = fetchedLives.onAir.map((live) => live.broadCastData);
      const fetchedFollowingOfflines = fetchedLives.offAir;

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

  useEffect(() => {
    fetchLives();
  }, []);

  return (
    <FollowingLivesContext.Provider
      value={{
        lives,
        Ids,
        offlines,
        isLoading,
        isError,
        fetchLives,
      }}
    >
      {children}
    </FollowingLivesContext.Provider>
  );
};
