type Broadcast = {
  broadcastId: string;
  title: string;
  contentCategory: string;
  moodCategory: string;
  tags: Array<string>;
  thumbnailUrl: string;
  viewerCount: number;
  userName: string;
  profileImageUrl: string;
};

type Token = {
  accessToken: string;
  refreshToken?: string;
};

type User = {
  name: string;
  profileImageUrl: string;
  broadcastId: string;
  followerCount: number;
  isLive: boolean;
};

export { Broadcast, Token, User };
