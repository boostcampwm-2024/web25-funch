import clsx from 'clsx';
import { type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {};

const StudioInput = ({ ...rest }: Props) => {
  return (
    <div
      className={clsx(
        'focus-within:border-border-brand-base border-border-neutral-weak h-10 rounded-md border border-solid pl-3.5 pr-1.5',
      )}
    >
      <input
        className={clsx(
          'text-content-neutral-primary funch-medium14 placeholder:text-content-neutral-weak inline-flex h-full w-full items-center bg-transparent outline-none',
        )}
        {...rest}
      />
    </div>
  );
};

export default StudioInput;
