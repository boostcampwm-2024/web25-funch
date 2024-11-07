import { appTheme } from '@libs/constants';

export type SvgComponentProps = {
  svgTitle?: string;
  svgDescription?: string;
};

export type InternalPath = `/${string}`;

export type Live = {
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

export type AppTheme = keyof typeof appTheme;
