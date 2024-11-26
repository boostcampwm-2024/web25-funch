'use client';

import useInternalRouter from '@hooks/useInternalRouter';
import { authenticateByGithub, authenticateByNaver } from '@libs/actions';
import { useEffect } from 'react';
import useUser from '@hooks/useUser';

type Props = {
  authCode: string;
  authState: string;
};

const AuthNaver = ({ authCode, authState }: Props) => {
  const { saveUserSession } = useUser();
  const { replace } = useInternalRouter();
  useEffect(() => {
    const fetchUser = async (code: string, state: string) => {
      try {
        const fetchResult = await authenticateByNaver({
          code,
          state,
        });
        saveUserSession(fetchResult);
      } catch (err) {
        alert('로그인에 실패했어요.');
      } finally {
        replace('/');
      }
    };
    fetchUser(authCode, authState);
  }, [authCode, authState, replace, saveUserSession]);
  return <div>인증 중...</div>;
};

export default AuthNaver;
