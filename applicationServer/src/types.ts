type Broadcast = {
  broadcastId: string;
  broadcastPath: string;
  title: string;
  contentCategory?: string;
  moodCategory?: string;
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
  profile_image: string;
  broadcast_id: string;
  follower_count: number;
};

export { Broadcast, Token, User };
