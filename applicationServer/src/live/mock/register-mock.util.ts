import { generateRandomName } from '@src/auth/util/name';

function registerMockLive(live) {
  const mockBroadcastIdList = [
    '872bc363-0d0c-4bde-a867-7b0edd076ad6',
    '11bc2553-16a3-4efd-b03c-3384c2d6b450',
    '9b534e89-a596-436a-b314-65cbe0ff9fab',
    '372d0676-7231-460d-a079-b68418074653',
    'b15b9d6e-e933-47fa-80a6-8c3470822e25',
    '0857c545-5ac1-474b-bc74-6ca2168d08c2',
    '4e3e511c-56a3-4657-974b-324b010ee725',
    '0181c997-3ab8-4872-a7c9-b95ff5d09fa9',
    '58fefadc-3fbd-40ad-bce1-f769c02c887f',
    'fec06dd7-11b4-4efd-b69e-5a9dc93c3891',
  ];

  mockBroadcastIdList.forEach((data, idx) => {
    const name = generateRandomName();
    live.data.set(mockBroadcastIdList[idx], {
      broadcastId: mockBroadcastIdList[idx],
      title: `${name}의 라이브 방송`,
      contentCategory: '소통',
      moodCategory: '',
      tags: [`방송 ${idx}`],
      thumbnailUrl: `https://kr.object.ncloudstorage.com/media-storage/${mockBroadcastIdList[idx]}/dynamic_thumbnail.jpg`,
      viewerCount: 0,
      userName: name,
      profileImageUrl: 'https://kr.object.ncloudstorage.com/funch-storage/profile/profile_default.png',
    });
  });
}

export { registerMockLive };
