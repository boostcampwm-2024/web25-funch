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
    <div className="text-content-neutral-strong flex justify-between">
      <h2 className="funch-bold14 funch-desktop:funch-bold16">
        {componentType === COMPONENT_TYPE.SUGGEST ? '추천 채널' : '팔로우 채널'}
      </h2>
      <div className="flex">
        <button
          className={`transform ${rotationCount > 0 ? 'rotate-360' : ''} transition duration-1000 ease-in-out`}
          style={{
            transform: `rotate(${360 * rotationCount}deg)`,
          }}
          onClick={handleClick}
        >
          <RefreshSvg />
        </button>
        <button onClick={() => setIsExpanded((prev) => !prev)}>{isExpanded ? <UpArrowSvg /> : <DownArrowSvg />}</button>
      </div>
    </div>
  );
};

export default DesktopHeader;
