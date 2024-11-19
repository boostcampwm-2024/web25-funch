import clsx from 'clsx';
import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const StudioUpdateButton = ({ children, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'flex h-11 w-full items-center justify-center rounded-md px-1 py-0.5',
        'funch-bold14 text-content-static-white bg-surface-brand-base hover:bg-surface-brand-strong',
        'opacity-100 disabled:opacity-35',
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default StudioUpdateButton;
