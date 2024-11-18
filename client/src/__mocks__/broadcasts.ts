import type { Broadcast } from '@libs/internalTypes';

export const mockedBroadcasts: Broadcast[] = [
  {
    broadcastId: 'aaa',
    title: '[충격] 트럼프 당선',
    contentCategory: 'POLITICS',
    moodCategory: 'INTERESTING',
    tags: ['politics', 'election'],
    thumbnailUrl: 'https://via.placeholder.com/150',
    viewerCount: 1000,
  },
  {
    broadcastId: 'bbb',
    title: '[데모 공유] 팀 무지개 치즈 3주차 발표',
    contentCategory: 'TECH',
    tags: ['funch', 'boostcamp'],
    moodCategory: 'FUN',
    thumbnailUrl: 'https://via.placeholder.com/150',
    viewerCount: 100,
  },
  {
    broadcastId: 'ccc',
    title: '고양이 냥냥이 냥냥냥이',
    contentCategory: 'ANIMAL',
    moodCategory: 'HAPPY',
    tags: ['cat', 'cute'],
    thumbnailUrl: 'https://via.placeholder.com/150',
    viewerCount: 300,
  },
  {
    broadcastId: 'ddd',
    title: '방송 제목',
    contentCategory: 'CATEGORY',
    moodCategory: 'MOOD',
    tags: ['tag1', 'tag2'],
    thumbnailUrl: 'https://via.placeholder.com/150',
    viewerCount: 200,
  },
  {
    broadcastId: 'eee',
    title: '방송 제목',
    contentCategory: 'CATEGORY',
    moodCategory: 'MOOD',
    tags: ['tag1', 'tag2'],
    thumbnailUrl: 'https://via.placeholder.com/150',
    viewerCount: 300,
  },
];
