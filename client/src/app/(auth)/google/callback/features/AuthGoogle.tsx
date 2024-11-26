'use client';

import useInternalRouter from '@hooks/useInternalRouter';
import { authenticateByGoogle } from '@libs/actions';
import { useEffect } from 'react';
import useUser from '@hooks/useUser';

type Props = {
  authCode: string;
};

const AuthGoogle = ({ authCode }: Props) => {
  const { saveUserSession } = useUser();
  const { replace } = useInternalRouter();
  useEffect(() => {
    let isValidEffect = true;
    const fetchUser = async (code: string) => {
      try {
        const fetchResult = await authenticateByGoogle(code);
        if (!isValidEffect) return;
        saveUserSession(fetchResult);
      } catch (err) {
        if (!isValidEffect) return;
        alert('로그인에 실패했어요.');
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
  return <div>인증 중...</div>;
};

export default AuthGoogle;
