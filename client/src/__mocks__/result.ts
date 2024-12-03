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
      name: '여행의달인',
      profile_image: 'https://via.placeholder.com/150',
      broadcast_id: '9f3a-4b2c-8d1e-6f5g',
      follower_count: 1205,
    },
    {
      name: '재테크전문가',
      profile_image: 'https://via.placeholder.com/150',
      broadcast_id: 'a7b9-2c3d-4e5f-6g7h',
      follower_count: 754,
    },
    {
      name: '피트니스트레이너',
      profile_image: 'https://via.placeholder.com/150',
      broadcast_id: 'h2j4-5k6l-7m8n-9p0q',
      follower_count: 512,
    },
    {
      name: '뷰티인플루언서',
      profile_image: 'https://via.placeholder.com/150',
      broadcast_id: 'r3s5-6t7u-8v9w-0x1y',
      follower_count: 987,
    },
  ],
};
