import { Test, TestingModule } from '@nestjs/testing';
import { LiveService } from '@live/live.service';
import { Live } from '@live/entities/live.entity';
import { Broadcast } from '@src/types';

function getMockLiveDataList(count) {
  const dummy = new Array(count).fill(0);
  const result: Broadcast[] = dummy.map((e, i) => {
    return {
      broadcastId: `test${i}`,
      title: `title${i}`,
      contentCategory: `content${i}`,
      moodCategory: `mood${i}`,
      tags: [`i${i}`],
      thumbnailUrl: `http://thumbnail${i}`,
      viewerCount: Math.ceil((i + 1000) * Math.random()),
    };
  });

  return result;
}

describe('LiveService 테스트', () => {
  let service: LiveService;

  const mockBroadcastData: Broadcast = {
    broadcastId: 'test',
    title: 'title',
    contentCategory: 'content',
    moodCategory: 'mood',
    tags: [],
    thumbnailUrl: 'thumbnail',
    viewerCount: 24,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveService],
    }).compile();
    service = module.get<LiveService>(LiveService);
  });

  it('LiveService가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });

  it('생방송 중인 스트리머의 broadcast Id로 playlist를 요청하면 playlist url이 담긴 객체를 반환해야 한다.', () => {
    const live: Live = Live.getInstance();
    live.data.set('test', mockBroadcastData);

    const result = service.responsePlaylistUrl('test');
    const createMultivariantPlaylistUrl = (id) =>
      `https://kr.object.ncloudstorage.com/media-storage/${id}/master_playlist.m3u8`;

    expect(result.url).toEqual(createMultivariantPlaylistUrl('test'));
    live.data.clear();
  });

  it('오프라인 스트리머의 broadcast Id로 playlist를 요청하면 에러가 발생해야 한다.', () => {
    expect(() => {
      service.responsePlaylistUrl('no user');
    }).toThrow();
  });

  it('생방송 중인 스트리머 리스트를 정해진 개수만큼 랜덤으로 받아와야 한다.', () => {
    const liveCount = 10;
    const live: Live = Live.getInstance();
    getMockLiveDataList(liveCount * 3).forEach((mockData) => live.data.set(mockData.broadcastId, mockData));

    const testList1 = service.getCurrentLiveListRandomShuffle(liveCount);
    const testList2 = service.getCurrentLiveListRandomShuffle(liveCount);

    expect(testList1).not.toEqual(testList2);
    live.data.clear();
  });

  it('생방송 중인 스트리머 리스트를 랜덤으로 받아올 때 요구 개수보다 전체 생방송 수가 적거나 같으면 전체 생방송 개수만큼 불러와야 한다.', () => {
    const liveCount = 10;
    const live: Live = Live.getInstance();
    getMockLiveDataList(liveCount).forEach((mockData) => live.data.set(mockData.broadcastId, mockData));

    const testList1 = service.getCurrentLiveListRandomShuffle(liveCount + 10);

    expect(testList1.length).toBe(liveCount);
    live.data.clear();
  });
});
