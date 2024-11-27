import { CONTENTS_CATEGORY, MOODS_CATEGORY } from '@libs/constants';
import type { Broadcast } from '@libs/internalTypes';

export const mockedBroadcasts: Broadcast[] = [
  {
    broadcastId: 'aaa',
    title: '[충격] 트럼프 당선',
    contentCategory: CONTENTS_CATEGORY.politics.CODE,
    moodCategory: MOODS_CATEGORY.calm.CODE,
    tags: ['politics', 'election', 'trump', 'usa', 'president'],
    thumbnailUrl: 'https://via.placeholder.com/150',
    viewerCount: 10870,
    userName: '슈카월드',
    profileImageUrl: 'https://via.placeholder.com/150',
  },
  {
    broadcastId: 'aaagggggg',
    title: '[충격] 해리스 낙선',
    contentCategory: CONTENTS_CATEGORY.politics.CODE,
    moodCategory: MOODS_CATEGORY.calm.CODE,
    tags: ['politics', 'election'],
    thumbnailUrl: 'https://via.placeholder.com/150',
    viewerCount: 1870,
    userName: '슈카월드',
    profileImageUrl: 'https://via.placeholder.com/150',
  },
];

export const getBroadcastsByContentCategory = (contentCategory: string) => {
  return mockedBroadcasts.filter((broadcast) => broadcast.contentCategory === contentCategory);
};

export const getBroadcastsByMoodCategory = (moodCategory: string) => {
  return mockedBroadcasts.filter((broadcast) => broadcast.moodCategory === moodCategory);
};
