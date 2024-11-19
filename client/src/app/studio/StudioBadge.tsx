import DeleteBadgeSvg from '@components/svgs/DeleteBadgeSvg';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type StudioBadgeProps = {
  handler?: () => void;
};

const StudioBadge = ({ children, handler }: PropsWithChildren & StudioBadgeProps) => {
  return (
    <div
      className={clsx(
        'funch-medium14 border-1 bg-surface-neutral-base border-border-neutral-weak text-content-neutral-weak cursor-default',
        'hover:bg-surface-neutral-strong inline-flex h-4 items-center justify-center gap-1 rounded-full border-[1px] px-3 py-3',
      )}
    >
      {children}
      <button onClick={handler}>
        <DeleteBadgeSvg />
      </button>
    </div>
  );
};

export default StudioBadge;
