import { Broadcast } from '@libs/internalTypes';
import { getSuggestedLiveList } from '@libs/actions';
import Image from 'next/image';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { comma } from '@libs/formats';

type SuggestedListProps = {
  isDesktop: boolean;
  isExpanded: boolean;
  isFolded: boolean;
  suggestedList: Broadcast[];
};

const SuggestedList = ({ isDesktop, isExpanded, isFolded, suggestedList }: SuggestedListProps) => {
  const foldedContent = suggestedList.slice(0, 5);

  return (
    <div className="pt-2">
      {isExpanded && (
        <>
          {isFolded ? (
            <>
              {suggestedList.map((suggest: Broadcast, key) => (
                <SuggestedListItem key={suggest.broadcastId} isDesktop={isDesktop} suggest={suggest} />
              ))}
            </>
          ) : (
            <>
              {foldedContent.map((suggest: Broadcast, key) => (
                <SuggestedListItem key={suggest.broadcastId} isDesktop={isDesktop} suggest={suggest} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

const SuggestedListItem = ({ suggest, isDesktop }: { suggest: Broadcast; isDesktop: boolean }) => {
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
                <Image
                  src={suggest.profileImageUrl}
                  alt={suggest.title}
                  width={32}
                  height={32}
                  className="border-border-brand-strong mt-[3px] box-content rounded-full border-2"
                />
                <section className="flex w-full pl-[10px]">
                  <section className="flex w-2/3 flex-1 flex-col">
                    <div className="text-surface-neutral-inverse funch-bold16">{suggest.userName}</div>
                    <div className="funch-bold10">{suggest.contentCategory}</div>
                  </section>
                  <p className="text-content-red-base funch-bold12 flex items-center pr-2">
                    {'· ' + comma(suggest.viewerCount)}
                  </p>
                </section>
              </div>
            </div>
          </Link>
          {isTooltipVisible && (
            <div
              className="text-content-neutral-primary border-neutral-weak bg-surface-neutral-strong funch-medium12 fixed flex h-20 w-60 items-center rounded-md p-4"
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
              className="border-neutral-weak funch-desktop:justify-start flex w-full items-center rounded-md py-3 pl-[5px]"
              onMouseEnter={handleNarrowMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={suggest.profileImageUrl}
                alt={suggest.title}
                width={32}
                height={32}
                className="border-border-brand-strong mx-[-1px] box-content rounded-full border-2 hover:m-[-2.2px] hover:border-4"
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
              <div className="text-content-red-base funch-bold14 h-1/4">{'· ' + comma(suggest.viewerCount)}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SuggestedList;
