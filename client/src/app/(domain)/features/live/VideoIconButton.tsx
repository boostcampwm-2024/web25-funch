import { type ButtonHTMLAttributes, type ReactElement } from 'react';
import clsx from 'clsx';
import { VideoIconComponentType } from '@libs/internalTypes';
import { VIDEO_ICON_COMPONENT_TYPE } from '@libs/constants';

type Props = {
  children: ReactElement<SVGElement>;
  componentType?: VideoIconComponentType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const VideoIconButton = ({ children, componentType = 'DEFAULT', ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-full',
        'hover:bg-surface-deemed bg-transparent',
        componentType === VIDEO_ICON_COMPONENT_TYPE.MINI_PLAYER
          ? 'text-content-neutral-primary hover:bg-surface-deemed-on-white dark:hover:bg-surface-deemed'
          : 'text-content-static-white hover:bg-surface-deemed',
        {
          'h-8 w-8': componentType === VIDEO_ICON_COMPONENT_TYPE.DEFAULT,
          'h-9 w-9':
            componentType === VIDEO_ICON_COMPONENT_TYPE.FULLSCREEN ||
            componentType === VIDEO_ICON_COMPONENT_TYPE.MINI_PLAYER,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default VideoIconButton;
