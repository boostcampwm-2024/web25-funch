'use client';

import FunchSvg from '@components/svgs/FunchSvg';
import React from 'react';
import StudioBtn from './StudioBtn';
import LoginBtn from './LoginBtn';
import ThemeController from './ThemeController';
import useUser from '@hooks/useUser';
import LogoutBtn from './LogoutBtn';

const ToolBar = () => {
  const { isLoggedin } = useUser();
  return (
    <div className="flex w-full items-center justify-between px-4">
      <h1 className="w-16">
        <a href="/" title="펀치 홈으로">
          <FunchSvg />
          <span className="absolute left-[-9999px] top-[-9999px] h-0 w-0">펀치</span>
        </a>
      </h1>
      <div className="flex items-center gap-4">
        <section className="flex h-full items-center gap-1">
          <ThemeController />
          <StudioBtn />
        </section>
        {isLoggedin ? <LogoutBtn /> : <LoginBtn />}
      </div>
    </div>
  );
};

export default ToolBar;
