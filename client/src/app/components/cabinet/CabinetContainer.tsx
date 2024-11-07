'use client';

import { useState, useEffect } from 'react';
import CabinetLink from './CabinetLink';
import RefreshSvg from '@components/svgs/RefreshSvg';
import DownArrowSvg from '@components/svgs/DownArrowSvg';
import FollowList from './FollowList';

const CabinetContainer = () => {
  return (
    <div className="flex h-full flex-col pt-16">
      <CategoryNavigator />
      <StreamerNavigator />
    </div>
  );
};

const CategoryNavigator = () => {
  return (
    <div className="funch-desktop:h-40 h-40 overflow-hidden">
      <CabinetLink link="category" />
      <CabinetLink link="follow" />
    </div>
  );
};

const StreamerNavigator = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    console.log(isDesktop);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="funch-desktop:w-5/6 border-y-surface-neutral-base mx-auto w-1/2 border-y-2 py-4">
      {isDesktop ? <FollowDesktopHeader /> : <FollowNavHeader />}
      <FollowList isDesktop={isDesktop} />
    </div>
  );
};

const FollowNavHeader = () => {
  return (
    <div className="text-content-neutral-strong w-full text-center">
      <h2 className="funch-bold12">팔로우</h2>
    </div>
  );
};

const FollowDesktopHeader = () => {
  return (
    <div className="text-content-neutral-strong flex justify-between">
      <h2 className="funch-bold14 funch-desktop:funch-bold16">팔로잉 채널</h2>
      <section className="flex">
        <RefreshSvg />
        <DownArrowSvg />
      </section>
    </div>
  );
};

export default CabinetContainer;
