'use client';

import { createContext, useState, type PropsWithChildren } from 'react';

type UserContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

type Props = PropsWithChildren;

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>({ name: '홍길동' });

  const logout = () => setUser(null);

  const login = () => setUser({ name: 'hong' });

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

type User = {
  name: string;
};
