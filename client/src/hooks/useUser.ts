'use client';

import { useEffect, useState } from 'react';
import useUserContext from '@hooks/useUserContext';

const getIsLoggedin = (user: any) => user !== null;

const useUser = () => {
  const { user, logout, login } = useUserContext();
  const [isLoggedin, setIsLoggedin] = useState(getIsLoggedin(user));

  useEffect(() => {
    setIsLoggedin(getIsLoggedin(user));
  }, [user]);

  return {
    isLoggedin,
    logout,
    login,
  };
};

export default useUser;
