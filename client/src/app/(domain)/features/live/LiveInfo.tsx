'use client';

import HeartSvg from '@components/svgs/HeartSvg';
import useLiveContext from '@hooks/useLiveContext';
import clsx from 'clsx';
import Image from 'next/image';
import { memo, type PropsWithChildren, type ReactNode, useEffect, useRef, useState } from 'react';
import Badge from '@app/(domain)/features/Badge';
import { comma } from '@libs/formats';
import type { Broadcast } from '@libs/internalTypes';

type Props = {
  children: (args: { liveInfo: Broadcast }) => ReactNode;
};

const LiveInfoWrapper = ({ children }: Props) => {
  // const [isHovered, setIsHovered] = useState(false);
  const { liveInfo, refreshLiveInfo, broadcastId } = useLiveContext();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // sse 통신을 이용해 지속적으로 라이브 정보를 받아서 refresh하도록 하기
    const fetchLiveInfo = () => {
      if (process.env.NODE_ENV !== 'production') return;

      const eventSource = new EventSource(`/api/live/sse/${broadcastId}`);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('✅ EVENT SOURCE OPENED');
      };

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('🚀 SSE DATA HAVE BEEN SERVED', data);
        refreshLiveInfo(data);
      };

      eventSource.onerror = () => {
        eventSource.close();
        fetchLiveInfo();
      };
    };

    fetchLiveInfo();

    return () => {
      eventSourceRef.current?.close();
    };
  }, [broadcastId]);

  return (
    <div className="px-7 pb-6 pt-4">
      {children({ liveInfo })}
      {/* <h3 className="funch-bold20 text-content-neutral-strong">{liveInfo.title}</h3>
      <div className="mt-4 flex">
        <div
          className="relative h-16 w-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-full w-full p-1.5">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                fill={true}
                sizes="100%"
                src={liveInfo.profileImageUrl}
                alt={`스트리머 ${liveInfo.userName}의 프로필 이미지`}
              />
            </div>
          </div>
          <div
            className={clsx(
              'border-border-brand-base absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-solid',
              isHovered ? 'border-4' : 'border-2',
            )}
          />
        </div>
        <div className="ml-2.5 w-60">
          <h4
            title={liveInfo.userName}
            className="text-content-neutral-strong funch-bold16 w-full overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {liveInfo.userName}
          </h4>
          {liveInfo.tags.length > 0 && (
            <ul className="mt-1.5 flex gap-1">
              {liveInfo.tags.map((tag, idx) => (
                <li key={idx}>
                  <Badge componentType="OUTLINE">{tag}</Badge>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-1">
            <span className="funch-medium12 text-content-neutral-base">{comma(liveInfo.viewerCount)}명 시청 중</span>
          </p>
        </div>
        <div className="ml-4 pt-5">
          <button
            className={clsx(
              'inline-flex h-8 items-center gap-0.5 rounded-full pl-3.5 pr-4',
              'bg-surface-brand-strong text-content-neutral-inverse hover:bg-surface-brand-base',
            )}
          >
            <HeartSvg />
            <span className="funch-meta14">팔로우</span>
          </button>
        </div>
      </div> */}
    </div>
  );
};

const LiveInfoTitle = memo(({ title }: { title: string }) => {
  return <h3 className="funch-bold20 text-content-neutral-strong">{title}</h3>;
});

const LiveInfoDetailWrapper = ({ children }: PropsWithChildren) => {
  return <div className="mt-4 grid w-full grid-cols-[4rem,1fr,6rem] gap-2.5">{children}</div>;
};

const LiveInfoProfileImage = memo(({ profileImageUrl, userName }: { profileImageUrl: string; userName: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative h-16" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative h-full w-full p-1.5">
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image fill={true} sizes="100%" src={profileImageUrl} alt={`스트리머 ${userName}의 프로필 이미지`} />
        </div>
      </div>
      <div
        className={clsx(
          'border-border-brand-base absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-solid',
          isHovered ? 'border-4' : 'border-2',
        )}
      />
    </div>
  );
});

const LiveInfoDescription = ({ children }: PropsWithChildren) => {
  return <div className="w-60">{children}</div>;
};

const LiveInfoUserName = memo(({ userName }: { userName: string }) => {
  return (
    <h4
      title={userName}
      className="text-content-neutral-strong funch-bold16 w-full overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {userName}
    </h4>
  );
});

const LiveInfoTags = memo(
  ({ contentCategory, moodCategory, tags }: { contentCategory: string; moodCategory: string; tags: string[] }) => {
    const allTags = [contentCategory, moodCategory, ...tags];

    return (
      <ul className="mt-1.5 flex flex-wrap gap-1">
        {allTags.map((tag, idx) => (
          <li key={idx}>
            <Badge componentType="OUTLINE">{tag}</Badge>
          </li>
        ))}
      </ul>
    );
  },
);

const LiveInfoViewerCount = memo(({ viewerCount }: { viewerCount: number }) => {
  return <span className="funch-medium12 text-content-neutral-base">{comma(viewerCount)}명 시청 중</span>;
});

const LiveInfoFollowButton = () => {
  return (
    <div className="pt-5">
      <button
        className={clsx(
          'inline-flex h-8 items-center gap-0.5 rounded-full pl-3.5 pr-4',
          'bg-surface-brand-strong text-content-neutral-inverse hover:bg-surface-brand-base',
        )}
      >
        <HeartSvg />
        <span className="funch-meta14">팔로우</span>
      </button>
    </div>
  );
};

const LiveInfo = Object.assign(LiveInfoWrapper, {
  Title: LiveInfoTitle,
  Wrapper: LiveInfoDetailWrapper,
  ProfileImage: LiveInfoProfileImage,
  Description: LiveInfoDescription,
  UserName: LiveInfoUserName,
  Tags: LiveInfoTags,
  ViewerCount: LiveInfoViewerCount,
  FollowButton: LiveInfoFollowButton,
});

export default LiveInfo;
