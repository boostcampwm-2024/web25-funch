'use client';

import { type PropsWithChildren } from 'react';
import UserProvider from '@providers/UserProvider';
import ThemeProvider from '@providers/ThemeProvider';

type Props = PropsWithChildren;

const GlobalProvider = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
