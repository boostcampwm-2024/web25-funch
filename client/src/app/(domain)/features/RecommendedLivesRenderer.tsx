'use client';

import Lives from '@components/livesGrid/Lives';
import type { Broadcast } from '@libs/internalTypes';
import useFollowingLives from '@hooks/useFollowingLives';
import Image from 'next/image';
import noContents from '@assets/no_result.png';
import clsx from 'clsx';

const RecommendedLivesRenderer = ({ lives }: { lives: Broadcast[] }) => {
  const { ids } = useFollowingLives();

  const filteredLives = lives?.filter((live) => !ids.includes(live.broadcastId)) || [];

  if (filteredLives.length === 0) {
    return (
      <div className={clsx('flex flex-col items-center')}>
        <Image src={noContents} alt="no-following-lives" width={200} height={200} />
        <p className={clsx('text-content-neutral-primary funch-medium16 mt-4')}>라이브 중인 방송이 없습니다.</p>
      </div>
    );
  }

  return (
    <Lives lives={filteredLives}>
      {({ visibleLives, isExpanded, toggle }) => (
        <>
          <Lives.List>
            {visibleLives.map((live, index) => (
              <Lives.Live key={live.broadcastId} live={live} isPriority={index === 0} />
            ))}
          </Lives.List>
          {filteredLives.length > 3 && <Lives.Expand isExpanded={isExpanded} toggle={toggle} />}
        </>
      )}
    </Lives>
  );
};

export default RecommendedLivesRenderer;
