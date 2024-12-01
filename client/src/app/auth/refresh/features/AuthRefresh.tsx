'use client';

import useUser from '@hooks/useUser';
import { refreshAccessToken } from '@libs/actions';
import { COOKIE_USER_KEY } from '@libs/constants';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const AuthRefresh = () => {
  const { logout } = useUser();
  useEffect(() => {
    (async () => {
      try {
        const { accessToken } = await refreshAccessToken();
        Cookies.set(COOKIE_USER_KEY, accessToken);
        location.href = '/';
      } catch (err) {
        alert('다시 로그인해주세요.');
        logout();
      }
    })();
  }, []);
  return null;
};

export default AuthRefresh;
