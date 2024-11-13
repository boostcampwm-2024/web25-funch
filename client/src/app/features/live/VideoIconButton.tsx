import { ButtonHTMLAttributes, ReactElement } from 'react';
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
        'text-content-static-white inline-flex items-center justify-center rounded-full',
        'hover:bg-surface-deemed bg-transparent',
        {
          'h-8 w-8': componentType === VIDEO_ICON_COMPONENT_TYPE.DEFAULT,
          'h-9 w-9': componentType === VIDEO_ICON_COMPONENT_TYPE.FULLSCREEN,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default VideoIconButton;
