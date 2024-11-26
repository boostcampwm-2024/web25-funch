'use client';

import FollowingLives from '../features/FollowingLives';
import useUser from '@hooks/useUser';
import FollowingOffair from './features/FollowingOffair';
import InduceLoginContent from './features/InduceLoginContent';

const FollowingPage = () => {
  const { isLoggedin } = useUser();

  return (
    <div className="min-h-home w-full px-7">
      {isLoggedin ? (
        <div className="min-h-home flex w-full flex-col">
          <FollowingLives />
          <FollowingOffair />
        </div>
      ) : (
        <div className="min-h-home flex w-full items-center justify-center">
          <InduceLoginContent />
        </div>
      )}
    </div>
  );
};

export default FollowingPage;
