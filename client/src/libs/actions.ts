import type { Broadcast, InternalUserSession, Playlist, User } from '@libs/internalTypes';
import fetcher from '@libs/fetcher';

export const getLiveList = async (): Promise<Broadcast[]> => {
  const result = await fetcher<Broadcast[]>({
    method: 'GET',
    url: '/api/live/list',
  });

  return result.sort((a, b) => b.viewerCount - a.viewerCount);
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

export const authenticate = async (code: string): Promise<InternalUserSession> => {
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
