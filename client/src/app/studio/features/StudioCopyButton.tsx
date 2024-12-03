'use client';

import { PropsWithChildren } from 'react';
import { type ButtonHTMLAttributes } from 'react';
import StudioToast from '@components/studio/StudioToast';
import { useState } from 'react';
import clsx from 'clsx';

type Props = PropsWithChildren<{
  text: string;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const StudioCopyButton = ({ children, text, ...rest }: Props) => {
  const [isShowToast, setIsShowToast] = useState<boolean>(false);
  const openToast = () => {
    setIsShowToast(true);
    navigator.clipboard.writeText(text);
  };
  const closeToast = () => {
    setIsShowToast(false);
  };

  return (
    <button
      className={clsx(
        'text-content-brand-strong funch-bold14 h-[2.4rem] w-full rounded-md',
        'bg-surface-brand-weak hover:opacity-65 disabled:opacity-35',
      )}
      onClick={openToast}
      {...rest}
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
