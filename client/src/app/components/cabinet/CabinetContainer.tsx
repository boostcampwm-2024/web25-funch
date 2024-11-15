'use client';

import { useState, useEffect } from 'react';
import CabinetLink from './CabinetLink';
import RefreshSvg from '@components/svgs/RefreshSvg';
import DownArrowSvg from '@components/svgs/DownArrowSvg';
import UpArrowSvg from '@components/svgs/UpArrowSvg';
import FollowList from './FollowList';
import useDesktop from '@hooks/useDesktop';
import AccordionButton from '@components/AccordionButton';

const CabinetContainer = () => {
  return (
    <div className="funch-desktop:pt-16 flex h-full flex-col pt-20">
      <CategoryNavigator />
      <StreamerNavigator />
    </div>
  );
};

const CategoryNavigator = () => {
  return (
    <div className="funch-desktop:h-32 h-40 min-h-28">
      <CabinetLink link="category" />
      <CabinetLink link="follow" />
    </div>
  );
};

const StreamerNavigator = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFolded, setIsFolded] = useState(false);
  const { isDesktop } = useDesktop();

  useEffect(() => {
    if (!isDesktop) {
      setIsExpanded(true);
    }
  }, [isDesktop]);

  return (
    <>
      <div className="funch-desktop:w-5/6 border-y-surface-neutral-base mx-auto w-1/2 border-y-2 py-4 pb-2">
        {isDesktop ? (
          <FollowDesktopHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        ) : (
          <FollowNavHeader />
        )}
        <FollowList isDesktop={isDesktop} isFolded={isFolded} isExpanded={isExpanded} />
        {isExpanded && isDesktop && (
          <div className="flex justify-center">
            <AccordionButton isExpanded={isFolded} toggle={() => setIsFolded((prev) => !prev)} />
          </div>
        )}
      </div>
    </>
  );
};

type ExpandedProps = {
  isExpanded: boolean;
  setIsExpanded: (value: React.SetStateAction<boolean>) => void; // 타입도 더 정확하게 수정
};

const FollowNavHeader = () => {
  return (
    <div className="text-content-neutral-strong w-full text-center">
      <h2 className="funch-bold12">팔로우</h2>
    </div>
  );
};

const FollowDesktopHeader = ({ isExpanded, setIsExpanded }: ExpandedProps) => {
  return (
    <div className="text-content-neutral-strong flex justify-between">
      <h2 className="funch-bold14 funch-desktop:funch-bold16">팔로잉 채널</h2>
      <div className="flex">
        <RefreshSvg />
        <button onClick={() => setIsExpanded((prev) => !prev)}>{isExpanded ? <UpArrowSvg /> : <DownArrowSvg />}</button>
      </div>
    </div>
  );
};

export default CabinetContainer;
