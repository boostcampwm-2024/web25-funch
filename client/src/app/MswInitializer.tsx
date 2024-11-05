'use client';

import { useState, useEffect, type PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const MswInitializer = ({ children }: Props) => {
  const [isMswInitialized, setIsMswInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { initMocks } = await import('@server/init');
      await initMocks();
      setIsMswInitialized(true);
    };
    if (!isMswInitialized) {
      init();
    }
  }, [isMswInitialized]);

  if (!isMswInitialized) return null;

  return children;
};

export default MswInitializer;
