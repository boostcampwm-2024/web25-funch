import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

const StudioUpdateButton = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={clsx(
        'funch-bold14 border-border-neutral-base flex cursor-default items-center justify-center rounded-md px-1 py-0.5',
        'text-content-static-white bg-surface-brand-base hover:bg-surface-brand-strong h-11 w-[466px]',
      )}
    >
      {children}
    </div>
  );
};

export default StudioUpdateButton;
