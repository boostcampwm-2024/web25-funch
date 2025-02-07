import type {
  Broadcast,
  FollowingList,
  InternalUserSession,
  Playlist,
  User,
  Update,
  MyData,
  ToggleFollow,
  SearchResult,
} from '@libs/internalTypes';
import fetcher from '@libs/fetcher';

export const getLiveList = async (): Promise<Broadcast[]> => {
  const result = await fetcher<Broadcast[]>({
    method: 'GET',
    url: '/api/live/list',
  });
  return result.sort((a, b) => b.viewerCount - a.viewerCount);
};

export const getFollowingLiveList = async (): Promise<FollowingList> => {
  const result = await fetcher<FollowingList>({
    method: 'GET',
    url: '/api/live/follow',
  });

  return result;
};

export const makeFollow = async ({ follower, following }: ToggleFollow): Promise<any> => {
  const requestBody = { follower, following } as any;
  const result = await fetcher({
    method: 'POST',
    url: '/api/follow',
    customOptions: {
      body: requestBody,
    },
  });

  return result;
};

export const makeUnfollow = async ({ follower, following }: ToggleFollow): Promise<any> => {
  const requestBody = { follower, following } as any;
  const result = await fetcher({
    method: 'DELETE',
    url: '/api/follow',
    customOptions: {
      body: requestBody,
    },
  });

  return result;
};

export const getPlaylist = async (broadcastId: string): Promise<Playlist> => {
  const result = await fetcher<Playlist>({
    method: 'GET',
    url: `/api/live/${broadcastId}`,
  });

  return result;
};

type SuggestedLiveListFetchResult = {
  suggest: Broadcast[];
};

export const getSuggestedLiveList = async (): Promise<Broadcast[]> => {
  const result = await fetcher<SuggestedLiveListFetchResult>({
    method: 'GET',
    url: '/api/live/list/suggest',
  });

  return result.suggest;
};

export const authenticateByGithub = async (code: string): Promise<InternalUserSession> => {
  const requestBody = { code } as any;
  const result = await fetcher<{
    accessToken: string;
    name: string;
    profile_image: string;
    broadcast_id: string;
  }>({
    method: 'POST',
    url: '/api/auth/github/callback',
    customOptions: {
      body: requestBody,
    },
  });

  return {
    accessToken: result.accessToken,
    user: {
      name: result.name,
      profileImageUrl: result['profile_image'],
      broadcastId: result['broadcast_id'],
    },
  };
};

export const authenticateByGoogle = async (code: string): Promise<InternalUserSession> => {
  const requestBody = { code } as any;
  const result = await fetcher<{
    accessToken: string;
    name: string;
    profile_image: string;
    broadcast_id: string;
  }>({
    method: 'POST',
    url: '/api/auth/google/callback',
    customOptions: {
      body: requestBody,
    },
  });

  return {
    accessToken: result.accessToken,
    user: {
      name: result.name,
      profileImageUrl: result['profile_image'],
      broadcastId: result['broadcast_id'],
    },
  };
};

export const authenticateByNaver = async ({
  code,
  state,
}: {
  code: string;
  state: string;
}): Promise<InternalUserSession> => {
  const requestBody = { code, state } as any;
  const result = await fetcher<{
    accessToken: string;
    name: string;
    profile_image: string;
    broadcast_id: string;
  }>({
    method: 'POST',
    url: '/api/auth/naver/callback',
    customOptions: {
      body: requestBody,
    },
  });

  return {
    accessToken: result.accessToken,
    user: {
      name: result.name,
      profileImageUrl: result['profile_image'],
      broadcastId: result['broadcast_id'],
    },
  };
};

export const updateInfo = async (formData: Update): Promise<Update> => {
  const requestBody = formData as any;

  const result = await fetcher<Update>({
    method: 'PATCH',
    url: '/api/live/update',
    customOptions: {
      body: requestBody,
    },
  });

  return result;
};

export const getStreamInfo = async (): Promise<MyData> => {
  const result = await fetcher<MyData>({
    method: 'GET',
    url: '/api/members/mydata',
  });

  return result;
};

export const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
  const result = await fetcher<{ accessToken: string }>({
    method: 'GET',
    url: '/api/auth/refresh',
  });

  return result;
};

export const getSearchResult = async (searchQuery: string): Promise<any> => {
  const result = await fetcher<SearchResult[]>({
    method: 'GET',
    url: `/api/search?query=${searchQuery}`,
  });

  return result;
};

export const refreshStreamKey = async (): Promise<{ stream_key: string }> => {
  const result = await fetcher<{ stream_key: string }>({
    method: 'PATCH',
    url: '/api/members/refresh/streamkey',
  });

  return result;
};
