'use client';

import DownArrowSvg from '@components/svgs/DownArrowSvg';
import clsx from 'clsx';

type Props = {
  isExpanded: boolean;
  toggle: () => void;
};

const AccordionButton = ({ isExpanded, toggle }: Props) => {
  return (
    <button
      className={clsx(
        'inline-flex h-7 items-center pl-4 pr-3',
        'funch-medium12 text-content-neutral-strong',
        'hover:bg-surface-neutral-base bg-transparent',
        'border-border-neutral-base hover:border-border-neutral-strong rounded-full border border-solid',
      )}
      onClick={toggle}
    >
      {isExpanded ? '접기' : '펼치기'}
      <span
        className={clsx(
          'inline-flex h-4 w-4 items-center justify-center',

          isExpanded ? 'rotate-180 transform' : 'rotate-0 transform',
        )}
      >
        <DownArrowSvg />
      </span>
    </button>
  );
};

export default AccordionButton;
