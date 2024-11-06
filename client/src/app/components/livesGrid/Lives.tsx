'use client';

import Badge from '@/app/features/Badge';
import AccordionButtonDemo from '@components/AccordionButtonDemo';
import LiveSvg from '@components/svgs/LiveSvg';
import type { Live } from '@libs/internalTypes';
import clsx from 'clsx';
import Link from 'next/link';
import { type ReactNode, type PropsWithChildren, useState } from 'react';

type ChildrenArgs = {
  visibleLives: Live[];
  isExpanded: boolean;
  toggle: () => void;
};

type Props = {
  lives: Live[];
  children: (args: ChildrenArgs) => ReactNode;
};

const LivesWrapper = ({ lives, children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const visibleLives = isExpanded ? lives : lives.slice(0, 3);

  return children({ visibleLives, isExpanded, toggle });
};

const ExpandButton = ({ isExpanded, toggle }: { isExpanded: boolean; toggle: () => void }) => {
  return (
    <div className="my-6 flex justify-center">
      <AccordionButtonDemo isExpanded={isExpanded} toggle={toggle} />
    </div>
  );
};

const LivesList = ({ children }: PropsWithChildren) => {
  return <div className={clsx('flex flex-wrap gap-x-3.5 gap-y-7')}>{children}</div>;
};

type LiveProps = {
  live: Live;
};

const Live = ({ live }: LiveProps) => {
  return (
    <div className={clsx('w-[calc(33.3334%-9.3334px)]')}>
      <Link
        aria-label={`${live.viewers}명이 보고 있는 방송 보러가기, 제목 '${live.title}'`}
        href={`/lives/${live.id}`}
        className={clsx('relative block h-44 overflow-hidden', 'rounded-xl border-0 border-solid border-transparent')}
      >
        <div className="h-full w-full bg-orange-100" />
        <LiveBadge viewers={live.viewers} />
      </Link>
      <div className={clsx('mt-3 grid grid-cols-[2.5rem,1fr] gap-2.5')}>
        <div className="h-10 w-full overflow-hidden rounded-full">
          <img
            width="100%"
            height="100%"
            src={live.streamer.profileImage}
            alt={`스트리머 ${live.streamer.name}의 프로필 이미지`}
          />
        </div>
        <div className="w-full pr-5">
          <h3 className="text-content-neutral-primary funch-bold16">{live.title}</h3>
          <p className="funch-bold14 text-content-neutral-strong inline-flex items-center">{live.streamer.name}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            <Badge>{live.category}</Badge>
            {live.tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LiveBadge = ({ viewers }: { viewers: number }) => {
  return (
    <div aria-hidden className="absolute left-1.5 top-1 flex h-5 gap-1">
      <span className="bg-surface-red-strong inline-flex h-full items-center rounded-md px-1">
        <LiveSvg />
      </span>
      <span className="funch-bold12 text-content-neutral-primary inline-flex h-full items-center rounded-md bg-[rgba(20,21,23,.9)] px-1">
        {viewers}명
      </span>
    </div>
  );
};

const Lives = Object.assign(LivesWrapper, {
  List: LivesList,
  Live,
  Expand: ExpandButton,
});

export default Lives;
