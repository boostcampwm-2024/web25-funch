import { CONTENTS_CATEGORY, MOODS_CATEGORY } from '@libs/constants';

export const mockedFollowingList = {
  onAir: [
    {
      playlistUrl: 'https://via.placeholder.com/150',
      broadCastData: {
        broadcastId: 'sss',
        title: '방송 제목',
        contentCategory: CONTENTS_CATEGORY.news.CODE,
        moodCategory: MOODS_CATEGORY.lonely.CODE,
        tags: ['tag1', 'tag2'],
        thumbnailUrl: 'https://via.placeholder.com/150',
        viewerCount: 900,
        userName: '말이 아홉마리지요 그러니까 10마리는 아닌거지요',
        profileImageUrl: 'https://via.placeholder.com/150',
      },
    },
    {
      playlistUrl: 'https://via.placeholder.com/150',
      broadCastData: {
        broadcastId: 'tadg',
        title: '방송 제목',
        contentCategory: CONTENTS_CATEGORY.outdoor.CODE,
        moodCategory: MOODS_CATEGORY.unknown.CODE,
        tags: ['tag1', 'tag2'],
        thumbnailUrl: 'https://via.placeholder.com/150',
        viewerCount: 1000,
        userName: '사자',
        profileImageUrl: 'https://via.placeholder.com/150',
      },
    },
    {
      playlistUrl: 'https://via.placeholder.com/150',
      broadCastData: {
        broadcastId: 'tasdgdg',
        title: '방송 제목sdg',
        contentCategory: CONTENTS_CATEGORY.outdoor.CODE,
        moodCategory: MOODS_CATEGORY.unknown.CODE,
        tags: ['tag1', 'tag2'],
        thumbnailUrl: 'https://via.placeholder.com/150',
        viewerCount: 1000,
        userName: '사자',
        profileImageUrl: 'https://via.placeholder.com/150',
      },
    },
  ],
  offAir: [
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
    {
      name: '공부의신',
      profile_image: 'https://via.placeholder.com/150',
      broadcast_id: 'z2a4-5b6c-7d8e-9f0g',
      follower_count: 345,
    },
  ],
};
