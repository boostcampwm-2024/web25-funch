'use client';

import RefreshSvg from '@components/svgs/RefreshSvg';
import DownArrowSvg from '@components/svgs/DownArrowSvg';
import UpArrowSvg from '@components/svgs/UpArrowSvg';
import clsx from 'clsx';
import { useState } from 'react';

const COMPONENT_TYPE = {
  FOLLOW: 'FOLLOW' as const,
  SUGGEST: 'SUGGEST' as const,
};

type BadgeComponentType = keyof typeof COMPONENT_TYPE;

type ExpandedProps = {
  isExpanded: boolean;
  setIsExpanded: (value: React.SetStateAction<boolean>) => void; // 타입도 더 정확하게 수정
  componentType: BadgeComponentType;
};

const DesktopHeader = ({ isExpanded, setIsExpanded, componentType }: ExpandedProps) => {
  const [rotationCount, setRotationCount] = useState(0);

  const handleClick = () => {
    setRotationCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="text-content-neutral-primary flex justify-between">
      <h2 className="funch-bold14 funch-desktop:funch-bold16">
        {componentType === COMPONENT_TYPE.SUGGEST ? '추천 채널' : '팔로우 채널'}
      </h2>
      <div className="flex gap-0.5">
        <button
          aria-label={componentType === COMPONENT_TYPE.SUGGEST ? '추천 채널 새로고침' : '팔로우 채널 새로고침'}
          title="새로고침"
          className={clsx(
            'flex h-7 w-7 items-center justify-center',
            `transform transition duration-1000 ease-in-out`,
            {
              'rotate-360': rotationCount > 0,
            },
          )}
          style={{
            transform: `rotate(${360 * rotationCount}deg)`,
          }}
          onClick={handleClick}
        >
          <RefreshSvg />
        </button>
        {isExpanded ? (
          <ArrowButton componentType="UP" setIsExpanded={setIsExpanded} />
        ) : (
          <ArrowButton componentType="DOWN" setIsExpanded={setIsExpanded} />
        )}
      </div>
    </div>
  );
};

type ArrowButtonProps = {
  componentType: 'UP' | 'DOWN';
  setIsExpanded: (value: React.SetStateAction<boolean>) => void;
};

const ArrowButton = ({ componentType, setIsExpanded }: ArrowButtonProps) => {
  return (
    <>
      {componentType === 'UP' ? (
        <button
          className="flex h-7 w-7 items-center justify-center"
          aria-label="팔로우 채널 접기"
          title="접기"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <UpArrowSvg />
        </button>
      ) : (
        <button
          className="flex h-7 w-7 items-center justify-center"
          aria-label="팔로우 채널 펼치기"
          title="펼치기"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <DownArrowSvg />
        </button>
      )}
    </>
  );
};

export default DesktopHeader;
