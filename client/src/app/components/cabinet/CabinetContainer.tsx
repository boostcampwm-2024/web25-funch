'use client';

import { useState, useEffect, PropsWithChildren, useMemo } from 'react';
import CabinetLink from './CabinetLink';
import useDesktop from '@hooks/useDesktop';
import AccordionButton from '@components/AccordionButton';
import CabinetItemList from './CabinetItemList';
import DesktopHeader from './DesktopHeader';
import { Broadcast } from '@libs/internalTypes';
import { getSuggestedLiveList } from '@libs/actions';
import useFollowingLives from '@hooks/useFollowingLives';
import useUser from '@hooks/useUser';

const CabinetContainer = () => {
  const { isLoggedin } = useUser();

  return (
    <div className="funch-desktop:pt-16 flex h-full w-full flex-col pt-20">
      <CategoryNavigator />
      {isLoggedin && <FollowNavigator />}
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

const FollowNavigator = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFolded, setIsFolded] = useState(false);
  const { isDesktop } = useDesktop();

  useEffect(() => {
    if (!isDesktop) {
      setIsExpanded(true);
    }
  }, [isDesktop]);

  const { lives } = useFollowingLives();

  return (
    <>
      <div className="funch-desktop:w-5/6 border-y-surface-neutral-base mx-auto w-1/2 border-t-2 py-4 pb-2">
        {isDesktop ? (
          <DesktopHeader isExpanded={isExpanded} componentType="FOLLOW" setIsExpanded={setIsExpanded} />
        ) : (
          <NavHeader>팔로우</NavHeader>
        )}
        <CabinetItemList isDesktop={isDesktop} isFolded={isFolded} isExpanded={isExpanded} itemList={lives} />
        {isDesktop && isExpanded && lives.length > 5 && (
          <div className="mt-2 flex justify-center">
            <AccordionButton isExpanded={isFolded} toggle={() => setIsFolded((prev) => !prev)} />
          </div>
        )}
      </div>
    </>
  );
};

const SuggestedNavigator = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFolded, setIsFolded] = useState(false);
  const [suggestedList, setSuggestedList] = useState<Broadcast[]>([]);
  const { isDesktop } = useDesktop();
  const { ids } = useFollowingLives();

  useEffect(() => {
    if (!isDesktop) {
      setIsExpanded(true);
    }
  }, [isDesktop]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const suggestions = await getSuggestedLiveList();

      setSuggestedList(suggestions);
    };

    fetchSuggestions();
  }, []);

  const filteredSuggestedList = useMemo(() => {
    return suggestedList.filter((suggested) => !ids.includes(suggested.broadcastId));
  }, [suggestedList, ids]);

  return (
    <>
      <div className="funch-desktop:w-5/6 border-y-surface-neutral-base mx-auto w-1/2 border-y-2 py-4 pb-2">
        {isDesktop ? (
          <DesktopHeader isExpanded={isExpanded} componentType="SUGGEST" setIsExpanded={setIsExpanded} />
        ) : (
          <NavHeader>추천</NavHeader>
        )}
        <CabinetItemList
          isDesktop={isDesktop}
          isFolded={isFolded}
          isExpanded={isExpanded}
          itemList={filteredSuggestedList}
        />
        {isDesktop && isExpanded && suggestedList.length > 5 && (
          <div className="mt-2 flex justify-center">
            <AccordionButton isExpanded={isFolded} toggle={() => setIsFolded((prev) => !prev)} />
          </div>
        )}
      </div>
    </>
  );
};

const NavHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-content-neutral-primary w-full text-center">
      <h2 className="funch-bold12">{children}</h2>
    </div>
  );
};

export default CabinetContainer;
