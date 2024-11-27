'use client';

import React from 'react';
import { Broadcast, User2 } from '@libs/internalTypes';
import useUser from '@hooks/useUser';
import Lives from '@components/livesGrid/Lives';
import clsx from 'clsx';
import useFollowingLives from '@hooks/useFollowingLives';

export const FollowingLives = () => {
  const { isLoggedin } = useUser(); // 기존 useUser 훅

  const { isError, isLoading, lives } = useFollowingLives();

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {isLoggedin && (
        <div className={clsx('mb-4 w-full')}>
          <div className={clsx('mb-2 flex items-center justify-between')}>
            <h2 className={clsx('text-content-neutral-primary funch-bold20')}>팔로우 중인 방송</h2>
          </div>
          <Lives lives={lives}>
            {({ visibleLives, isExpanded, toggle }) => (
              <>
                <Lives.List>
                  {visibleLives.map((live, index) => (
                    <Lives.Live key={live.broadcastId} live={live} isPriority={index === 0} />
                  ))}
                </Lives.List>
                {lives.length > 3 && <Lives.Expand isExpanded={isExpanded} toggle={toggle} />}
              </>
            )}
          </Lives>
        </div>
      )}
    </>
  );
};
