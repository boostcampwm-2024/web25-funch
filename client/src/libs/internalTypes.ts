import { APP_THEME, VIDEO_ICON_COMPONENT_TYPE } from '@libs/constants';

export type SvgComponentProps = {
  svgTitle?: string;
  svgDescription?: string;
};

export type InternalPath = `/${string}`;

export type Live = {
  isStreaming?: boolean;
  id: string;
  thumbnail: string;
  viewers: number;
  title: string;
  category: string;
  tags: string[];
  streamer: {
    name: string;
    profileImage: string;
  };
};

export type Follow = {
  id: string;
};

export type AppTheme = keyof typeof APP_THEME;

export type VideoIconComponentType = keyof typeof VIDEO_ICON_COMPONENT_TYPE;
