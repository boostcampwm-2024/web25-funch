import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

const StudioAddButton = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={clsx(
        'funch-bold14 border-border-neutral-base flex cursor-default items-center justify-center rounded-md px-1 py-0.5',
        'text-content-brand-weak bg-surface-brand-weak hover:bg-surface-neutral-strong h-10 w-16',
      )}
    >
      {children}
    </div>
  );
};

export default StudioAddButton;
