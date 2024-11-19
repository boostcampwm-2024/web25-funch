import clsx from 'clsx';
import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const StudioAddButton = ({ children, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'funch-bold14 inline-flex items-center justify-center rounded-md px-1 py-0.5',
        'text-content-brand-strong bg-surface-static-violetalpha-base hover:bg-surface-static-violetalpha-strong h-10 w-16',
        'opacity-100 disabled:opacity-35',
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default StudioAddButton;
