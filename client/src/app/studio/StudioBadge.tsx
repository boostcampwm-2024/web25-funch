import DeleteBadgeSvg from '@components/svgs/DeleteBadgeSvg';
import { PropsWithChildren } from 'react';

const StudioBadge = ({ children }: PropsWithChildren) => {
  return (
    <span className="funch-medium12 border-1 bg-surface-neutral-base border-border-neutral-weak text-content-neutral-weak flex h-4 items-center justify-center gap-1 rounded-full border-[1px] px-2 py-1">
      {children}
      <DeleteBadgeSvg />
    </span>
  );
};

export default StudioBadge;
