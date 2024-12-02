'use client';

import HeartSvg from '@components/svgs/HeartSvg';
import FullHeart from '@components/svgs/FullHeart';
import useLiveContext from '@hooks/useLiveContext';
import clsx from 'clsx';
import Image from 'next/image';
import { memo, type PropsWithChildren, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Badge from '@app/(domain)/features/Badge';
import { comma } from '@libs/formats';
import type { Broadcast } from '@libs/internalTypes';
import { makeFollow, makeUnfollow } from '@libs/actions';
import useUser from '@hooks/useUser';
import useUserContext from '@hooks/useUserContext';
import useFollowingLives from '@hooks/useFollowingLives';
import LoginModal from '@components/layout/LoginModal';

type Props = {
  children: (args: { liveInfo: Broadcast }) => ReactNode;
};

const LiveInfoWrapper = ({ children }: Props) => {
  const { liveInfo, refreshLiveInfo, broadcastId, isLivePage } = useLiveContext();
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
        if (!data) return;
        console.log('🥳 LIVE INFO DATA ARE BEING HANDLED', data);
        refreshLiveInfo(data);
      };

      eventSource.onerror = () => {
        console.log('❌ EVENT SOURCE ERROR');
        eventSource.close();
      };
    };

    fetchLiveInfo();

    return () => {
      eventSourceRef.current?.close();
    };
  }, [broadcastId]);

  return (
    <div
      className={clsx(
        {
          'absolute h-0 w-0 overflow-hidden p-0': !isLivePage,
        },
        {
          'px-7 pb-6 pt-4': isLivePage,
        },
      )}
    >
      {children({ liveInfo })}
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
    const memoizedTags = useMemo(() => tags, [tags]);
    return (
      <ul className="mt-1.5 flex flex-wrap gap-1">
        {contentCategory && <Tag>{contentCategory}</Tag>}
        {moodCategory && <Tag>{moodCategory}</Tag>}
        {memoizedTags.length > 0 && <Tags tags={memoizedTags} />}
      </ul>
    );
  },
);

const Tags = memo(({ tags }: { tags: string[] }) => {
  return (
    <>
      {tags.map((tag, idx) => (
        <Tag key={idx}>{tag}</Tag>
      ))}
    </>
  );
});

const Tag = memo(({ children }: PropsWithChildren) => {
  return (
    <li>
      <Badge componentType="OUTLINE">{children}</Badge>
    </li>
  );
});

const LiveInfoViewerCount = memo(({ viewerCount }: { viewerCount: number }) => {
  return <span className="funch-medium12 text-content-neutral-base">{comma(viewerCount)}명 시청 중</span>;
});

type LiveInfoFollowButtonProps = {
  broadcastId: string;
};

const LiveInfoFollowButton = memo(({ broadcastId }: LiveInfoFollowButtonProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const closeModal = () => {
    setIsShowModal(false);
  };
  const { ids, refetchLives } = useFollowingLives();
  const { isLoggedin } = useUser();
  const { userSession } = useUserContext();
  const [isFollowed, setIsFollowed] = useState(false);

  const myId = userSession?.user?.broadcastId || '';

  useEffect(() => {
    setIsFollowed(ids.includes(broadcastId));
  }, [ids, broadcastId]);

  const handleClickFollow = useCallback(
    async ({
      isLoggedin,
      isFollowed,
      myId,
      broadcastId,
    }: {
      isLoggedin: boolean;
      isFollowed: boolean;
      myId: string;
      broadcastId: string;
    }) => {
      if (!isLoggedin) {
        setIsShowModal(true);
        return;
      }

      if (!isFollowed) {
        await makeFollow({ follower: myId, following: broadcastId });
        setIsFollowed(true);
      } else {
        await makeUnfollow({ follower: myId, following: broadcastId });
        setIsFollowed(false);
      }

      refetchLives();
    },
    [refetchLives],
  );

  return (
    <>
      <div className="pt-5">
        <button
          className={clsx(
            'inline-flex h-8 items-center gap-0.5 rounded-full pl-3.5',
            'text-content-neutral-inverse pr-4 hover:opacity-65',
            {
              'bg-surface-static-warmgray': isFollowed,
              'bg-surface-brand-strong': !isFollowed,
            },
          )}
          onClick={() => {
            handleClickFollow({ isLoggedin, isFollowed, myId, broadcastId });
          }}
        >
          {isFollowed ? <FullHeart /> : <HeartSvg />}
          <span className="funch-meta14">{isFollowed ? '팔로잉' : '팔로우'}</span>
        </button>
      </div>
      {isShowModal && <LoginModal close={closeModal}>로그인 후 이용할 수 있어요.</LoginModal>}
    </>
  );
});

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
