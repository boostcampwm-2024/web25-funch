'use client';

import useInternalRouter from '@hooks/useInternalRouter';
import { authenticateByGithub } from '@libs/actions';
import { useEffect } from 'react';
import useUser from '@hooks/useUser';

type Props = {
  authCode: string;
};

let isValidCall = true;

const Auth = ({ authCode }: Props) => {
  const { saveUserSession } = useUser();
  const { replace } = useInternalRouter();
  useEffect(() => {
    let isValidEffect = true;
    const fetchUser = async (code: string) => {
      try {
        if (!isValidCall) return;
        const fetchResult = await authenticateByGithub(code);
        isValidCall = false;
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
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <p className="funch-bold20 text-content-neutral-primary">인증 중...</p>
      </div>
    </div>
  );
};

export default Auth;
