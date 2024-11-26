'use client';
import DeemedLink from '@components/DeemedLink';
import clsx from 'clsx';
import useUser from '@hooks/useUser';
import Lives from '@components/livesGrid/Lives';
import { useEffect, useState } from 'react';
import type { Broadcast } from '@libs/internalTypes';
import { getFollowingLiveList } from '@libs/actions';

const FollowingLives = () => {
  const { isLoggedin } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [lives, setLives] = useState<Broadcast[]>([]);

  useEffect(() => {
    let isValidEffect = true;
    const fetchLives = async () => {
      try {
        const fetchedLives = await getFollowingLiveList();

        const fetchedFollowingLives = fetchedLives.onAir.map((live) => live.broadCastData);
        console.log(fetchedFollowingLives[0].tags);

        setLives(fetchedFollowingLives);

        setIsLoading(false);
      } catch (err) {
        if (!isValidEffect) return;
        setLives([]);
        setIsError(true);
      }
    };

    fetchLives();

    return () => {
      isValidEffect = false;
    };
  }, []);

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {isLoggedin && (
        <div className={clsx('w-full')}>
          <div className={clsx('mb-2 flex items-center justify-between')}>
            <h2 className={clsx('text-content-neutral-primary funch-bold20')}>팔로우 중인 방송</h2>
            <DeemedLink url="/following" name="전체보기" />
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

export default FollowingLives;
