import { CONTENTS_CATEGORY, MOODS_CATEGORY } from '@libs/constants';

export const mockedSearchResults = {
  lives: [
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
  ],
  members: [
    {
      name: 'name1',
      profile_image: 'profile_image1',
      broadcast_id: 'broadcast_id1',
      follower_count: 1,
    },
    {
      name: 'name2',
      profile_image: 'profile_image2',
      broadcast_id: 'broadcast_id2',
      follower_count: 2,
    },
  ],
};
