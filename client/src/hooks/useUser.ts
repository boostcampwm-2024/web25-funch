'use client';

import { useEffect, useState } from 'react';
import useUserContext from '@hooks/useUserContext';

const getIsLoggedin = (user: any) => user !== null;

const useUser = () => {
  const { userSession, logout, loginByGithub, loginByNaver, saveUserSession } = useUserContext();
  const [isLoggedin, setIsLoggedin] = useState(getIsLoggedin(userSession));

  useEffect(() => {
    setIsLoggedin(getIsLoggedin(userSession));
  }, [userSession]);

  return {
    loggedinUser: userSession?.user || null,
    isLoggedin,
    logout,
    loginByGithub,
    loginByNaver,
    saveUserSession,
  };
};

export default useUser;
