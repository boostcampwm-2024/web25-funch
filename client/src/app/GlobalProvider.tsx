'use client';

import { type PropsWithChildren } from 'react';
import UserProvider from '@providers/UserProvider';
import ThemeProvider from '@providers/ThemeProvider';
import { FollowingLivesProvider } from '@providers/FollowingLivesProvider';

type Props = PropsWithChildren;

const GlobalProvider = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <FollowingLivesProvider>{children}</FollowingLivesProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
