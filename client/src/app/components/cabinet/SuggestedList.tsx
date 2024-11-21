import { Broadcast, Live, Suggest } from '@libs/internalTypes';
import { getSuggestedLiveList } from '@libs/actions';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const SuggestedList = ({
  isDesktop,
  isExpanded,
  isFolded,
}: {
  isDesktop: boolean;
  isExpanded: boolean;
  isFolded: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedList, setSuggestedList] = useState<Broadcast[]>([]);

  const hoverRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const suggestions = await getSuggestedLiveList();
      setSuggestedList(suggestions);
      setIsLoading(false);
    };

    fetchSuggestions();
  }, []);

  const foldedContent = suggestedList.slice(0, 5);

  return (
    <div className="pt-2">
      {isExpanded && (
        <>
          {isFolded ? (
            <>
              {suggestedList.map((suggest: Suggest, key) => (
                <SuggestedListItem key={suggest.broadcastId} isDesktop={isDesktop} suggest={suggest} />
              ))}
            </>
          ) : (
            <>
              {foldedContent.map((suggest: Suggest, key) => (
                <SuggestedListItem key={suggest.broadcastId} isDesktop={isDesktop} suggest={suggest} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

const SuggestedListItem = ({ suggest, isDesktop }: { suggest: Suggest; isDesktop: boolean }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const CABINET_WIDTH = 208;

    setTooltipPosition({
      top: rect.top,
      left: rect.left + CABINET_WIDTH,
    });

    setTooltipVisible(true);
  };

  const handleNarrowMouseEnter = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const CABINET_WIDTH = 56;

    setTooltipPosition({
      top: rect.top,
      left: rect.left + CABINET_WIDTH,
    });

    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <>
      {isDesktop ? (
        <div className="relative">
          <Link href={'/lives/' + suggest.broadcastId}>
            <div
              className="border-neutral-weak funch-desktop:justify-start hover:bg-surface-neutral-strong flex w-full items-center rounded-md py-3 pl-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative flex flex-1">
                <img
                  src={suggest.profileImageUrl}
                  alt={suggest.title}
                  className="border-border-brand-strong mt-[3px] box-content h-8 w-8 rounded-full border-2"
                />
                <section className="flex w-full pl-[10px]">
                  <section className="flex w-2/3 flex-1 flex-col">
                    <div className="text-surface-neutral-inverse funch-medium14">{suggest.userName}</div>
                    <div className="funch-bold12">{suggest.contentCategory}</div>
                  </section>
                  <em className="text-content-red-base funch-bold16 flex items-center pr-2">
                    {'· ' + suggest.viewerCount}
                  </em>
                </section>
              </div>
            </div>
          </Link>
          {isTooltipVisible && (
            <div
              className="text-content-neutral-primary border-neutral-weak bg-surface-neutral-strong fixed flex h-20 w-60 items-center rounded-md p-4"
              style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            >
              {suggest.title}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <Link href={'/lives/' + suggest.broadcastId}>
            <div
              className={`border-neutral-weak funch-desktop:justify-start flex w-full items-center rounded-md py-3 pl-1 ${suggest.isStreaming && 'pl-[5px]'}`}
              onMouseEnter={handleNarrowMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={suggest.profileImageUrl}
                alt={suggest.title}
                className="border-border-brand-strong mx-[-1px] box-content h-8 w-8 rounded-full border-2 hover:m-[-2.2px] hover:border-4"
              />
            </div>
          </Link>
          {isTooltipVisible && (
            <div
              className="bg-surface-neutral-base fixed flex h-32 w-52 flex-col rounded-md p-3"
              style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            >
              <div className="flex h-1/4 w-full items-center gap-2 truncate">
                <div className="text-content-brand-strong funch-bold16">{suggest.userName}</div>
                <div className="funch-bold14 bg-content-static-coolgray rounded-md border-2 p-[3px]">
                  {suggest.tags[0]}
                </div>
              </div>
              <div className="funch-medium14 mt-2 flex-1">{suggest.title}</div>
              <div className="text-content-red-base funch-bold16 h-1/4">{'· ' + suggest.viewerCount}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SuggestedList;
