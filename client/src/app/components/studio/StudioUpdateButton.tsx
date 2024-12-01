'use client';

import clsx from 'clsx';
import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import StudioToast from './StudioToast';
import { useState } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const StudioUpdateButton = ({ children, ...rest }: Props) => {
  const [isshowToast, setIsShowToast] = useState<boolean>(false);
  const openToast = () => {
    setIsShowToast(true);
  };
  const closeToast = () => {
    setIsShowToast(false);
  };

  return (
    <button
      disabled
      className={clsx(
        'flex h-11 w-full items-center justify-center rounded-md px-1 py-0.5',
        'funch-bold14 text-content-static-white bg-surface-brand-base hover:bg-surface-brand-strong',
        'opacity-100 disabled:opacity-35',
      )}
      {...rest}
      onClick={openToast}
    >
      {isshowToast && (
        <StudioToast open={isshowToast} close={closeToast}>
          변경되었습니다.
        </StudioToast>
      )}
      {children}
    </button>
  );
};

export default StudioUpdateButton;
