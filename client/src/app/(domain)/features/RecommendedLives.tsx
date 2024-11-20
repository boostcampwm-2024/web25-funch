'use client';

import DeemedLink from '@components/DeemedLink';
import clsx from 'clsx';
import Lives from '@components/livesGrid/Lives';
import { useEffect, useState } from 'react';
import type { Broadcast } from '@libs/internalTypes';
import { getSuggestedLiveList } from '@libs/actions';

const RecommendedLives = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [lives, setLives] = useState<Broadcast[]>([]);

  useEffect(() => {
    let isValidEffect = true;
    const fetchLives = async () => {
      try {
        const fetchedLives = await getSuggestedLiveList();
        setLives(fetchedLives);
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
    <div>
      <div className={clsx('mb-2 flex items-center justify-between')}>
        <h2 className={clsx('text-content-neutral-primary funch-bold20')}>이 방송 어때요?</h2>
        <DeemedLink url="/" name="전체보기" />
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
  );
};

export default RecommendedLives;
