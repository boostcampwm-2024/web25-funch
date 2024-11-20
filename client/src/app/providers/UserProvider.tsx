'use client';

import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import { login as loginAction } from '@libs/actions';
import type { User } from '@libs/internalTypes';
import { COOKIE_USER_KEY, LOCAL_STORAGE_USER_KEY } from '@libs/constants';
import useInternalRouter from '@hooks/useInternalRouter';
import cookies from 'js-cookie';

type UserContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

type Props = PropsWithChildren;

const UserProvider = ({ children }: Props) => {
  const { push } = useInternalRouter();
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    const ok = confirm('로그아웃하시겠어요?');
    if (!ok) {
      return;
    }
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    cookies.remove(COOKIE_USER_KEY);
    push('/');
  };

  const login = async () => {
    const user = await loginAction();
    if (user) {
      setUser(user);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      cookies.set(COOKIE_USER_KEY, user.name);
    } else {
      setUser(null);
      throw new Error('로그인에 실패했어요.');
    }
  };

  useEffect(() => {
    // localStorage에 저장된 사용자 정보가 있다면 로그인 상태로 설정
    const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
