'use client';

import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { type ButtonHTMLAttributes } from 'react';

type Props = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>;

const StudioReissueButton = ({ children, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'text-content-static-white funch-bold14 h-[2.4rem] w-full rounded-md',
        'bg-surface-brand-strong hover:opacity-65 disabled:opacity-35',
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
export default StudioReissueButton;
