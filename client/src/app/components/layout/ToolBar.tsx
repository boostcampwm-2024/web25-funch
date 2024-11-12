'use client';

import FunchSvg from '@components/svgs/FunchSvg';
import React from 'react';
import StudioBtn from './StudioBtn';
import LoginBtn from './LoginBtn';
import ThemeController from './ThemeController';
import useUser from '@hooks/useUser';
import LogoutBtn from './LogoutBtn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ToolBar = () => {
  const pathname = usePathname();
  const { isLoggedin } = useUser();
  return (
    <div className="bg-bg-base flex h-full w-full items-center justify-between px-4">
      <h1>
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              location.reload();
            }
          }}
          title="펀치 홈으로"
          className="relative grid h-12 grid-cols-[2.5rem,1fr] items-center gap-1"
        >
          <span className="inline-flex h-full w-12 items-center justify-center">
            <FunchSvg />
          </span>
          <span aria-hidden className="funch-bold20 text-content-brand-base dark:text-content-static-white">
            FUNCH
          </span>
          <span className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">펀치</span>
        </Link>
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex h-full items-center gap-1">
          <ThemeController />
          {isLoggedin && <StudioBtn />}
        </div>
        {isLoggedin ? <LogoutBtn /> : <LoginBtn />}
      </div>
    </div>
  );
};

export default ToolBar;
