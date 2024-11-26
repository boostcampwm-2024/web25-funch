'use client';

import Lives from '@components/livesGrid/Lives';
import type { Broadcast } from '@libs/internalTypes';

type Props = {
  lives: Broadcast[];
};

const ContentCategory = ({ lives }: Props) => {
  return (
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
  );
};

export default ContentCategory;
