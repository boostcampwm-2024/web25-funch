import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

const BUTTON_COMPONENT_TYPE = {
  ADD: 'ADD' as const,
  UPDATE: 'UPDATE' as const,
};

type ButtonComponentType = keyof typeof BUTTON_COMPONENT_TYPE;

type Props = PropsWithChildren<{
  componentType?: ButtonComponentType;
}>;

const StudioButton = ({ children, componentType }: Props) => {
  return (
    <div
      className={clsx(
        'funch-bold14 border-border-neutral-base flex cursor-default items-center justify-center rounded-md px-1 py-0.5',
        {
          'text-content-brand-weak bg-surface-brand-weak hover:bg-surface-neutral-strong h-10 w-16':
            componentType === BUTTON_COMPONENT_TYPE.ADD,
          'text-content-static-white bg-surface-brand-strong hover:bg-surface-brand-base h-11 w-[466px]':
            componentType === BUTTON_COMPONENT_TYPE.UPDATE,
        },
      )}
    >
      {children}
    </div>
  );
};

export default StudioButton;
