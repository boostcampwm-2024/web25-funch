import { APP_THEME, HTTP_METHOD, VIDEO_ICON_COMPONENT_TYPE } from '@libs/constants';

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

export type HttpMethod = keyof typeof HTTP_METHOD;

export type FetcherParams = {
  method: HttpMethod;
  url: `/${string}`;
  customOptions?: RequestInit;
};

type UserSession = {
  name: string;
  profileImageUrl: string;
  broadcastId: string;
};

export type InternalUserSession = {
  accessToken: string;
  user: UserSession;
};

export type Chat = {
  name: string;
  content: string;
};

// API models
// 11.20 17:40
export type Broadcast = {
  broadcastId: string;
  title: string;
  contentCategory: string;
  moodCategory: string;
  tags: string[];
  thumbnailUrl: string;
  viewerCount: number;
  userName: string;
  profileImageUrl: string;
};

// 11.20 18:30
export type Playlist = {
  playlistUrl: string;
  broadcastData: Broadcast;
};

export type Streamkey = {
  id: string;
};

export type Token = {
  accessToken: string;
  refreshToken?: string;
};

export type User = {
  name: string;
  profileImageUrl: string;
  broadcastId: string;
  followerCount: number;
  isLive: boolean;
};

export type Update = {
  title: string;
  contentCategory: string;
  moodCategory: string;
  tags: Array<string>;
  thumbnail?: string | null;
};

export type Mydata = {
  id: string;
  name: string;
  profile_image: string;
  stream_key: string;
  broadcast_id: string;
  follower_count: number;
  created_at: string;
  deleted_at?: string;
};
