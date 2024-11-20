import clsx from 'clsx';
import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    fullWidth?: boolean;
  }>;

const BrandButton = ({ children, fullWidth = true, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'flex h-8 items-center justify-center rounded-md px-1 py-0.5',
        'funch-bold14 text-content-static-white bg-surface-brand-base hover:bg-surface-brand-strong',
        'opacity-100 disabled:opacity-35',
        {
          'w-full': fullWidth,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BrandButton;
