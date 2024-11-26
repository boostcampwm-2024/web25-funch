import { useContext } from 'react';
import { FollowingLivesContext } from '@providers/FollowingLivesProvider';

const useFollowingLives = () => {
  const context = useContext(FollowingLivesContext);

  if (context === undefined) {
    throw new Error('useFollowingLives must be used within a FollowingLivesProvider');
  }

  return context;
};

export default useFollowingLives;
