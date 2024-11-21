'use client';

import { useEffect, useState } from 'react';
import useUserContext from '@hooks/useUserContext';

const getIsLoggedin = (user: any) => user !== null;

const useUser = () => {
  const { userSession, logout, login, saveUserSession } = useUserContext();
  const [isLoggedin, setIsLoggedin] = useState(getIsLoggedin(userSession));

  useEffect(() => {
    setIsLoggedin(getIsLoggedin(userSession));
  }, [userSession]);

  console.log('userSession', userSession);

  return {
    loggedinUser: userSession?.user || null,
    isLoggedin,
    logout,
    login,
    saveUserSession,
  };
};

export default useUser;
