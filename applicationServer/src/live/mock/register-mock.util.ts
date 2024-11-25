import { generateRandomName } from '@src/auth/util/name';

function registerMockLive(live) {
  const mockBroadcastIdList = [
    '872bc363-0d0c-4bde-a867-7b0edd076ad6',
    '9b534e89-a596-436a-b314-65cbe0ff9fab',
    'b15b9d6e-e933-47fa-80a6-8c3470822e25',
    '58fefadc-3fbd-40ad-bce1-f769c02c887f',
    'fec06dd7-11b4-4efd-b69e-5a9dc93c3891',
  ];
  const contentCategoryList = ['music', 'talk', null, 'cook', 'mukbang'];
  const moodCategoryList = [null, 'calm', null, 'happy', null];

  mockBroadcastIdList.forEach((data, idx) => {
    const name = generateRandomName();
    live.data.set(mockBroadcastIdList[idx], {
      broadcastId: mockBroadcastIdList[idx],
      broadcastPath: `${mockBroadcastIdList[idx]}`,
      title: `${name}의 라이브 방송`,
      contentCategory: contentCategoryList[idx],
      moodCategory: moodCategoryList[idx],
      tags: [`방송 ${idx}`],
      thumbnailUrl: `https://kr.object.ncloudstorage.com/media-storage/${mockBroadcastIdList[idx]}/dynamic_thumbnail.jpg`,
      viewerCount: 0,
      userName: name,
      profileImageUrl: 'https://kr.object.ncloudstorage.com/funch-storage/profile/profile_default.png',
    });
  });
}

export { registerMockLive };
