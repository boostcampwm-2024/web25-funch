import { LiveContext } from '@providers/LiveProvider';
import { useContext } from 'react';

const useLiveContext = () => {
  const context = useContext(LiveContext);

  if (!context) {
    throw new Error('컨텍스트가 초기화되지 않았어요.');
  }

  return context;
};

export default useLiveContext;
