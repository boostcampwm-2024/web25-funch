'use client';

import { createContext, useCallback, useEffect, useState, type PropsWithChildren } from 'react';
import type { InternalUserSession } from '@libs/internalTypes';
import { COOKIE_USER_KEY, LOCAL_STORAGE_USER_KEY } from '@libs/constants';
import useInternalRouter from '@hooks/useInternalRouter';
import cookies from 'js-cookie';

type UserContextType = {
  userSession: InternalUserSession | null;
  loginByGithub: () => Promise<void>;
  loginByNaver: () => Promise<void>;
  logout: () => void;
  saveUserSession: (user: InternalUserSession) => void;
};

export const UserContext = createContext<UserContextType>({
  userSession: null,
  loginByGithub: async () => {},
  loginByNaver: async () => {},
  logout: () => {},
  saveUserSession: () => {},
});

type Props = PropsWithChildren;

const UserProvider = ({ children }: Props) => {
  const { push } = useInternalRouter();
  const [userSession, setUserSession] = useState<InternalUserSession | null>(null);

  const saveUserSession = useCallback((newUserSession: InternalUserSession) => {
    setUserSession({
      ...newUserSession,
    });
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUserSession));
    cookies.set(COOKIE_USER_KEY, newUserSession.accessToken);
  }, []);

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

  const loginByGithub = async () => {
    const githubClientId =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID
        : process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID_DEV;

    location.href = `${process.env.NEXT_PUBLIC_GITHUB_AUTH_BASE_URL}?client_id=${githubClientId}`;
  };

  const loginByNaver = async () => {
    const naverClientId = process.env.NEXT_PUBLIC_NAVER_AUTH_CLIENT_ID;
    const redirectUri =
      process.env.NODE_ENV === 'production'
        ? 'https://funch.site/naver/callback'
        : 'http://localhost:3000/naver/callback';

    location.href = `${process.env.NEXT_PUBLIC_NAVER_AUTH_BASE_URL}?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectUri}`;
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
        loginByGithub,
        loginByNaver,
        logout,
        saveUserSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
