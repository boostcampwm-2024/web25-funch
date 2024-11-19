import DeleteBadgeSvg from '@components/svgs/DeleteBadgeSvg';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const StudioBadge = ({ children, ...rest }: Props) => {
  return (
    <div
      className={clsx(
        'funch-medium12 border-1 bg-surface-neutral-base border-border-neutral-weak text-content-neutral-primary cursor-default',
        'hover:bg-surface-neutral-strong inline-flex h-4 items-center justify-center gap-1 rounded-full border-[1px] px-3 py-3',
      )}
    >
      {children}
      <button {...rest}>
        <DeleteBadgeSvg />
      </button>
    </div>
  );
};

export default StudioBadge;
