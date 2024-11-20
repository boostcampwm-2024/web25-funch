import clsx from 'clsx';
import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const StudioChatButton = ({ children, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'text-content-brand-strong bg-surface-static-violetalpha-base hover:bg-surface-static-violetalpha-strong funch-bold14',
        'flex h-7 w-11 items-center justify-center rounded-md opacity-100 disabled:opacity-35',
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default StudioChatButton;
