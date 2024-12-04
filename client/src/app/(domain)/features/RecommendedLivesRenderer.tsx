'use client';

import Lives from '@components/livesGrid/Lives';
import type { Broadcast } from '@libs/internalTypes';
import useFollowingLives from '@hooks/useFollowingLives';

const RecommendedLivesRenderer = ({ lives }: { lives: Broadcast[] }) => {
  const { ids } = useFollowingLives();

  const filteredLives = lives?.filter((live) => !ids.includes(live.broadcastId)) || [];

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
