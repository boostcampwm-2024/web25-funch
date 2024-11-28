'use client';

import useInternalRouter from '@hooks/useInternalRouter';
import { authenticateByGithub, authenticateByNaver } from '@libs/actions';
import { useEffect } from 'react';
import useUser from '@hooks/useUser';
import AuthLoading from '@app/(auth)/features/AuthLoading';

type Props = {
  authCode: string;
  authState: string;
};

const AuthNaver = ({ authCode, authState }: Props) => {
  const { saveUserSession } = useUser();
  const { replace } = useInternalRouter();
  useEffect(() => {
    let isValidEffect = true;
    const fetchUser = async (code: string, state: string) => {
      try {
        const fetchResult = await authenticateByNaver({
          code,
          state,
        });
        if (!isValidEffect) return;
        saveUserSession(fetchResult);
      } catch (err) {
        if (!isValidEffect) return;
        console.log('로그인에 실패했어요.');
        // alert('로그인에 실패했어요.');
      } finally {
        if (!isValidEffect) return;
        replace('/');
      }
    };
    fetchUser(authCode, authState);

    return () => {
      isValidEffect = false;
    };
  }, [authCode, authState, replace, saveUserSession]);
  return <AuthLoading />;
};

export default AuthNaver;
