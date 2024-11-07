'use client';

import useInternalRouter from '@hooks/useInternalRouter';
import HeaderControlButton from './HeaderControlButton';

const StudioBtn = () => {
  const { push } = useInternalRouter();
  return (
    <HeaderControlButton
      componentType="STUDIO"
      onClick={() => {
        push('/studio');
      }}
    />
  );
};

export default StudioBtn;
