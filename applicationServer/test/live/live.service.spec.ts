import { Test, TestingModule } from '@nestjs/testing';
import { LiveService } from '@live/live.service';
import { Live } from '@live/entities/live.entity';
import { Broadcast } from '@src/types'

describe('LiveService 테스트', () => {
  let service: LiveService;

  const mockBroadcastData: Broadcast = {
    broadcastId: 'test',
    title: 'title',
    contentCategory: 'content',
    moodCategory: 'mood',
    tags: [],
    thumbnailUrl: 'thumbnail',
    viewerCount: 24
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveService],
    }).compile();
    service = module.get<LiveService>(LiveService);
  });

  it('LiveService가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });

  it('생방송 중인 스트리머의 broadcast Id로 playlist를 요청하면 playlist url이 담긴 객체를 반환해야 한다.' , () => {
    const live: Live = Live.getInstance();
    live.data.set('test', mockBroadcastData);

    const result = service.responsePlaylistUrl('test')
    const createMultivariantPlaylistUrl = (id) =>  `https://kr.object.ncloudstorage.com/media-storage/${id}/master_playlist.m3u8`;
    
    expect(result.url).toEqual(createMultivariantPlaylistUrl('test'));
  });

  it('오프라인 스트리머의 broadcast Id로 playlist를 요청하면 에러가 발생해야 한다.', () => {
    expect(()=> {service.responsePlaylistUrl('no user')}).toThrow();
  })
});
