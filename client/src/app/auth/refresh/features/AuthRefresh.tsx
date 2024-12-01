'use client';

import useUser from '@hooks/useUser';
import { refreshAccessToken } from '@libs/actions';
import { COOKIE_USER_KEY } from '@libs/constants';
import Cookies from 'js-cookie';
import { useEffect, useRef } from 'react';

const AuthRefresh = () => {
  const isValidCallRef = useRef(true);
  const { logout } = useUser();
  useEffect(() => {
    let isValidEffect = true;
    (async () => {
      try {
        if (!isValidCallRef.current) return;
        const { accessToken } = await refreshAccessToken();
        if (!isValidEffect) return;
        isValidCallRef.current = false;
        Cookies.set(COOKIE_USER_KEY, accessToken);
        location.href = '/';
      } catch (err) {
        if (!isValidEffect) return;
        alert('다시 로그인해주세요.');
        logout();
      }
    })();

    return () => {
      isValidEffect = false;
    };
  }, []);
  return null;
};

export default AuthRefresh;
