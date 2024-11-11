'use client';

import { createContext, useState, type PropsWithChildren } from 'react';

type LiveContextType = {
  hlsUrl: string | null;
  changeHlsUrl: (url: string) => void;
};

export const LiveContext = createContext<LiveContextType | null>(null);

const LiveProvider = ({ children }: PropsWithChildren) => {
  const [hlsUrl, setHslUrl] = useState<string | null>(null);

  const changeHlsUrl = (url: string) => {
    setHslUrl(url);
  };

  return (
    <LiveContext.Provider
      value={{
        hlsUrl,
        changeHlsUrl,
      }}
    >
      {children}
    </LiveContext.Provider>
  );
};

export default LiveProvider;
