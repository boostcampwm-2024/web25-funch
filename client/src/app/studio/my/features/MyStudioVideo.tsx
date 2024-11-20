import clsx from 'clsx';
import React from 'react';

const MyStudioVideo = () => {
  return (
    <div className={clsx('pt-live-aspect-ratio relative w-full')}>
      <div className={clsx('bg-surface-static-black absolute left-0 top-0 h-full w-full')} />
    </div>
  );
};

export default MyStudioVideo;
