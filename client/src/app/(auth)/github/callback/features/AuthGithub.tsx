'use client';

import useInternalRouter from '@hooks/useInternalRouter';
import { authenticateByGithub } from '@libs/actions';
import { useEffect } from 'react';
import useUser from '@hooks/useUser';
import AuthLoading from '@app/(auth)/features/AuthLoading';

type Props = {
  authCode: string;
};

const AuthGithub = ({ authCode }: Props) => {
  const { saveUserSession } = useUser();
  const { replace } = useInternalRouter();
  useEffect(() => {
    let isValidEffect = true;
    const fetchUser = async (code: string) => {
      try {
        const fetchResult = await authenticateByGithub(code);
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
    fetchUser(authCode);

    return () => {
      isValidEffect = false;
    };
  }, [authCode, replace, saveUserSession]);
  return <AuthLoading />;
};

export default AuthGithub;
