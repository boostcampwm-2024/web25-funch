'use client';

import useInternalRouter from '@hooks/useInternalRouter';
import HeaderControlButton from './HeaderControlButton';

const StudioBtn = () => {
  const { push } = useInternalRouter();
  return (
    <HeaderControlButton
      aria-label="펀치 스튜디오로 이동하기"
      componentType="STUDIO"
      onClick={() => {
        push('/studio');
      }}
    />
  );
};

export default StudioBtn;
