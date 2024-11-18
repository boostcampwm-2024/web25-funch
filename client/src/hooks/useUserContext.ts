'use client';

import { useContext } from 'react';
import { UserContext } from '@providers/UserProvider';

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('컨텍스트가 초기화되지 않았어요.');
  }

  return context;
};

export default useUserContext;
