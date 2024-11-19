import MoonSvg from '@components/svgs/MoonSvg';
import StudioSvg from '@components/svgs/StudioSvg';
import SunSvg from '@components/svgs/SunSvg';
import clsx from 'clsx';
import { ButtonHTMLAttributes, useState } from 'react';

type HeaderControlButtonType = keyof typeof headerControlButtonType;

const headerControlButtonType = {
  STUDIO: 'STUDIO' as const,
  DARK: 'DARK' as const,
  LIGHT: 'LIGHT' as const,
};

const headerControlButtonTextContent = {
  STUDIO: '스튜디오' as const,
  DARK: '밝은 테마' as const,
  LIGHT: '어두운 테마' as const,
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  componentType: HeaderControlButtonType;
};

const getButtonContent = (componentType: HeaderControlButtonType) => {
  switch (componentType) {
    case headerControlButtonType.STUDIO:
      return headerControlButtonTextContent.STUDIO;
    case headerControlButtonType.DARK:
      return headerControlButtonTextContent.DARK;
    case headerControlButtonType.LIGHT:
      return headerControlButtonTextContent.LIGHT;
    default:
      return '';
  }
};

const HeaderControlButton = ({ componentType, ...rest }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div className={clsx('relative h-10 w-10')}>
      <button
        className={clsx(
          'inline-flex h-full w-full items-center justify-center overflow-hidden rounded-md',
          'text-content-neutral-primary',
          'hover:bg-surface-neutral-strong bg-transparent',
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        <HeaderControlIcon componentType={componentType} />
      </button>
      {isHover && (
        <span
          className={clsx(
            'absolute left-1/2 top-[calc(100%+0.25rem)] -translate-x-1/2',
            'flex items-center px-2 py-1',
            'funch-medium12 text-content-neutral-primary whitespace-nowrap',
            'bg-surface-neutral-strong rounded-md',
          )}
        >
          {getButtonContent(componentType)}
        </span>
      )}
    </div>
  );
};

const HeaderControlIcon = ({ componentType }: { componentType: HeaderControlButtonType }) => {
  if (componentType === headerControlButtonType.STUDIO) {
    return <StudioSvg />;
  }
  if (componentType === headerControlButtonType.DARK) {
    return <SunSvg />;
  }
  if (componentType === headerControlButtonType.LIGHT) {
    return <MoonSvg />;
  }

  return null;
};

export default HeaderControlButton;
