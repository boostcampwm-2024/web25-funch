'use client';

import { type PropsWithChildren } from 'react';
import UserProvider from '@providers/UserProvider';

type Props = PropsWithChildren;

const GlobalProvider = ({ children }: Props) => {
  return <UserProvider>{children}</UserProvider>;
};

export default GlobalProvider;
