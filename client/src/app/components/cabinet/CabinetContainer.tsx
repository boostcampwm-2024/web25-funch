'use client';

import { useState, useEffect } from 'react';
import CabinetLink from './CabinetLink';
import useDesktop from '@hooks/useDesktop';
import AccordionButton from '@components/AccordionButton';
import SuggestedList from './SuggestedList';
import DesktopHeader from './DesktopHeader';

const CabinetContainer = () => {
  return (
    <div className="funch-desktop:pt-16 flex h-full w-full flex-col pt-20">
      <CategoryNavigator />
      <SuggestedNavigator />
    </div>
  );
};

const CategoryNavigator = () => {
  return (
    <div className="funch-desktop:h-32 funch-desktop:min-h-32 h-40 min-h-40">
      <CabinetLink link="category" />
      <CabinetLink link="follow" />
    </div>
  );
};

const SuggestedNavigator = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
          <DesktopHeader isExpanded={isExpanded} componentType="SUGGEST" setIsExpanded={setIsExpanded} />
        ) : (
          <NavHeader />
        )}
        <SuggestedList isDesktop={isDesktop} isFolded={isFolded} isExpanded={isExpanded} />
        {isExpanded && isDesktop && (
          <div className="flex justify-center">
            <AccordionButton isExpanded={isFolded} toggle={() => setIsFolded((prev) => !prev)} />
          </div>
        )}
      </div>
    </>
  );
};

const NavHeader = () => {
  return (
    <div className="text-content-neutral-strong w-full text-center">
      <h2 className="funch-bold12">추천</h2>
    </div>
  );
};

export default CabinetContainer;
