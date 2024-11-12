import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

const BADGE_COMPONENT_TYPE = {
  DEFAULT: 'DEFAULT' as const,
  OUTLINE: 'OUTLINE' as const,
};

type BadgeComponentType = keyof typeof BADGE_COMPONENT_TYPE;

type Props = PropsWithChildren<{
  componentType?: BadgeComponentType;
}>;

const Badge = ({ children, componentType = 'DEFAULT' }: Props) => {
  return (
    <span
      className={clsx(
        'funch-bold10 cursor-default rounded-md px-1 py-0.5',

        {
          'bg-surface-neutral-weak text-content-neutral-strong': componentType === BADGE_COMPONENT_TYPE.DEFAULT,
          'text-content-neutral-base border-border-neutral-base border border-solid bg-transparent':
            componentType === BADGE_COMPONENT_TYPE.OUTLINE,
        },
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
