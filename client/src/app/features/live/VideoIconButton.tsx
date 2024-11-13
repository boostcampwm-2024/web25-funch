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

const VideoIconButton = ({ children, onClick, disabled = false, componentType = 'DEFAULT' }: IconProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'text-content-static-white inline-flex items-center justify-center rounded-full',
        'hover:bg-surface-deemed bg-transparent',
        {
          'h-8 w-8': componentType === ICON_TYPES.DEFAULT,
          'h-9 w-9': componentType === ICON_TYPES.FULLSCREEN,
        },
      )}
      type="button"
    >
      {children}
    </button>
  );
};

export default VideoIconButton;
