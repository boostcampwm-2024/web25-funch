'use client';

import { PropsWithChildren } from 'react';
import { type ButtonHTMLAttributes } from 'react';
import StudioToast from '@components/studio/StudioToast';
import { useState } from 'react';

type Props = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>;

const StudioCopyButton = ({ children }: Props) => {
  const [isShowToast, setIsShowToast] = useState<boolean>(false);
  const openToast = () => {
    setIsShowToast(true);
  };
  const closeToast = () => {
    setIsShowToast(false);
  };

  return (
    <button
      className="bg-surface-brand-weak text-content-brand-base funch-bold14 h-[2.4rem] w-[4.5rem] rounded-md hover:opacity-90"
      onClick={openToast}
    >
      {isShowToast && (
        <StudioToast open={isShowToast} close={closeToast}>
          복사되었습니다.
        </StudioToast>
      )}
      {children}
    </button>
  );
};
export default StudioCopyButton;
