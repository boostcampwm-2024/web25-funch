import type { Broadcast, Playlist, User } from '@libs/internalTypes';

export const getLiveList = async (): Promise<Broadcast[]> => {
  const response = await fetch(`/api/live/list`);

  if (!response.ok) {
    throw new Error('라이브 방송 목록을 불러올 수 없어요.');
  }

  const data = await response.json();

  return data as Broadcast[];
};

export const getPlaylist = async (broadcastId: string): Promise<Playlist> => {
  const response = await fetch(`/api/live/${broadcastId}`);

  if (!response.ok) {
    throw new Error('플레이리스트를 불러올 수 없어요.');
  }

  const data = await response.json();

  return data as Playlist;
};

export const getSuggestedLiveList = async (): Promise<Broadcast[]> => {
  const response = await fetch(`/api/live/list/suggest`);

  if (!response.ok) {
    throw new Error('추천 라이브 목록을 불러올 수 없어요.');
  }

  const data = await response.json();

  return data as Broadcast[];
};

export const login = async (): Promise<User> => {
  const response = await fetch(`/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('로그인에 실패했어요.');
  }

  const data = await response.json();

  return data as User;
};
