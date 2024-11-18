type Broadcast = {
  broadcastId: string;
  title: string;
  contentCategory: string;
  moodCategory: string;
  tags: Array<string>;
  thumbnailUrl: string;
  viewerCount: number;
};

type Playlist = {
  url: string;
};

type Streamkey = {
  id: string;
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

export { Broadcast, Playlist, Streamkey, Token, User };
