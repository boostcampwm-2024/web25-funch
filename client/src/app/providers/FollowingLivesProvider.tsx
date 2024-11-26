'use client';

import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { getFollowingLiveList } from '@libs/actions';
import { Broadcast, User2 } from '@libs/internalTypes';

interface FollowingLivesContextType {
  lives: Broadcast[];
  offlines: User2[];
  isLoading: boolean;
  isError: boolean;
  fetchLives: () => Promise<void>;
}

const FollowingLivesContext = createContext<FollowingLivesContextType | undefined>(undefined);

export const FollowingLivesProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [lives, setLives] = useState<Broadcast[]>([]);
  const [offlines, setOfflines] = useState<User2[]>([]);

  const fetchLives = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const fetchedLives = await getFollowingLiveList();
      const fetchedFollowingLives = fetchedLives.onAir.map((live) => live.broadCastData);
      const fetchedFollowingOfflines = fetchedLives.offAir;

      setLives(fetchedFollowingLives);
      setOfflines(fetchedFollowingOfflines);
      setIsLoading(false);
    } catch (err) {
      setLives([]);
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

export const useFollowingLives = () => {
  const context = useContext(FollowingLivesContext);

  if (context === undefined) {
    throw new Error('useFollowingLives must be used within a FollowingLivesProvider');
  }

  return context;
};
