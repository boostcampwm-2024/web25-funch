'use client';

import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { InternalUserSession } from '@libs/internalTypes';
import { COOKIE_USER_KEY, LOCAL_STORAGE_USER_KEY } from '@libs/constants';
import useInternalRouter from '@hooks/useInternalRouter';
import cookies from 'js-cookie';

type UserContextType = {
  userSession: InternalUserSession | null;
  login: () => Promise<void>;
  logout: () => void;
  saveUserSession: (user: InternalUserSession) => void;
};

export const UserContext = createContext<UserContextType>({
  userSession: null,
  login: async () => {},
  logout: () => {},
  saveUserSession: () => {},
});

type Props = PropsWithChildren;

const UserProvider = ({ children }: Props) => {
  const { push } = useInternalRouter();
  const [userSession, setUserSession] = useState<InternalUserSession | null>(null);

  const saveUserSession = (newUserSession: InternalUserSession) => {
    setUserSession({
      ...newUserSession,
    });
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUserSession));
    cookies.set(COOKIE_USER_KEY, newUserSession.accessToken);
  };

  const clearUserSession = () => {
    setUserSession(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    cookies.remove(COOKIE_USER_KEY);
  };

  const logout = () => {
    const ok = confirm('로그아웃하시겠어요?');
    if (!ok) {
      return;
    }
    clearUserSession();
    push('/');
  };

  const login = async () => {
    location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}`;
  };

  useEffect(() => {
    // localStorage에 저장된 사용자 정보가 있다면 로그인 상태로 설정
    const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (user) {
      setUserSession(JSON.parse(user));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userSession,
        login,
        logout,
        saveUserSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
