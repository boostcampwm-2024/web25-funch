'use client';

import { useEffect, useMemo, useState } from 'react';
import useUserContext from '@hooks/useUserContext';

const getIsLoggedin = (user: any) => user !== null;

const useUser = () => {
  const { userSession, logout, loginByGithub, loginByNaver, loginByGoogle, saveUserSession } = useUserContext();
  const [isLoggedin, setIsLoggedin] = useState(getIsLoggedin(userSession));

  useEffect(() => {
    setIsLoggedin(getIsLoggedin(userSession));
  }, [userSession]);

  const loggedinUser = useMemo(() => userSession?.user || null, [userSession]);

  return {
    loggedinUser,
    isLoggedin,
    logout,
    loginByGithub,
    loginByNaver,
    loginByGoogle,
    saveUserSession,
  };
};

export default useUser;
