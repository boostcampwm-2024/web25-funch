import React, { ReactElement } from 'react';
import clsx from 'clsx';

const ICON_TYPES = {
  DEFAULT: 'DEFAULT' as const,
  FULLSCREEN: 'FULLSCREEN' as const,
};

type IconType = keyof typeof ICON_TYPES;

type IconProps = {
  children: ReactElement<SVGElement>;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  componentType?: IconType;
};

const VideoIconButton: React.FC<IconProps> = ({
  children,
  onClick,
  disabled = false,
  componentType = 'DEFAULT',
}: IconProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'hover:bg-surface-neutral-weak inline-flex items-center justify-center rounded-full transition-opacity ease-in hover:opacity-80 disabled:opacity-50',
        {
          'h-16 w-16': componentType === ICON_TYPES.DEFAULT,
          'h-20 w-20': componentType === ICON_TYPES.FULLSCREEN,
        },
      )}
      type="button"
    >
      {children}
    </button>
  );
};

export default VideoIconButton;
