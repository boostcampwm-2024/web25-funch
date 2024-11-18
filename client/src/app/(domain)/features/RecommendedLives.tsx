'use client';

import DeemedLink from '@components/DeemedLink';
import clsx from 'clsx';
import Lives from '@components/livesGrid/Lives';
import { mockedLives } from '@mocks/lives';

const RecommendedLives = () => {
  return (
    <div>
      <div className={clsx('mb-2 flex items-center justify-between')}>
        <h2 className={clsx('text-content-neutral-primary funch-bold20')}>이 방송 어때요?</h2>
        <DeemedLink url="/" name="전체보기" />
      </div>
      <Lives lives={mockedLives}>
        {({ visibleLives, isExpanded, toggle }) => (
          <>
            <Lives.List>
              {visibleLives.map((live) => (
                <Lives.Live key={live.id} live={live} />
              ))}
            </Lives.List>
            <Lives.Expand isExpanded={isExpanded} toggle={toggle} />
          </>
        )}
      </Lives>
    </div>
  );
};

export default RecommendedLives;
