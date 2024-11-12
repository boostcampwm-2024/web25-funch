import clsx from 'clsx';
import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button = ({ children, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'inline-flex h-8 items-center px-3',
        'funch-bold12',
        'border-border-neutral-base rounded-lg border border-solid',
        'text-content-neutral-primary hover:bg-surface-neutral-base bg-transparent',
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;