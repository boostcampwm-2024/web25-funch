import { Test, TestingModule } from '@nestjs/testing';
import { LiveService } from '@live/live.service';
import { Live } from '@live/entities/live.entity';
import { Broadcast } from '@src/types';
import { Member } from '@src/member/member.entity';
import { MemberModule } from '@src/member/member.module';

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
      userName: `testUser${i}`,
      profileImageUrl: 'http://zz.com',
    };
  });

  return result;
}

function getMockMemberList(count) {
  const dummy = new Array(count).fill(0);
  const result: Member[] = dummy.map((e, i) => {
    return {
      id: `id${i}`,
      name: `name${i}`,
      profile_image: 'http://test.com',
      stream_key: `test_stream_key${i}`,
      broadcast_id: `test${i}`,
      follower_count: 0,
      createdAt: new Date(),
      deletedAt: null,
    } as Member;
  });

  return result;
}

describe('LiveService 테스트', () => {
  let service: LiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MemberModule],
      providers: [LiveService],
    }).compile();
    service = module.get<LiveService>(LiveService);
  });

  it('LiveService가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });

  it('생방송 중인 스트리머의 broadcast Id로 playlist를 요청하면 playlist url이 담긴 객체를 반환해야 한다.', () => {
    const live: Live = Live.getInstance();
    getMockLiveDataList(1).forEach((mockData) => live.data.set(mockData.broadcastId, mockData));

    const result = service.responseLiveData('test0');
    const createMultivariantPlaylistUrl = (id) =>
      `https://kr.object.ncloudstorage.com/media-storage/${id}/master_playlist.m3u8`;

    expect(result.playlistUrl).toEqual(createMultivariantPlaylistUrl('test0'));
    live.data.clear();
  });

  it('오프라인 스트리머의 broadcast Id로 playlist를 요청하면 에러가 발생해야 한다.', () => {
    expect(() => {
      service.responseLiveData('no user');
    }).toThrow();
  });

  it('생방송 중인 스트리머 리스트를 정해진 개수만큼 랜덤으로 받아와야 한다.', () => {
    const liveCount = 10;
    const live: Live = Live.getInstance();
    getMockLiveDataList(liveCount * 3).forEach((mockData) => live.data.set(mockData.broadcastId, mockData));

    const testList1 = service.getRandomLiveList(liveCount);
    const testList2 = service.getRandomLiveList(liveCount);

    expect(testList1).not.toEqual(testList2);
    live.data.clear();
  });

  it('생방송 중인 스트리머 리스트를 랜덤으로 받아올 때 요구 개수보다 전체 생방송 수가 적거나 같으면 전체 생방송 개수만큼 불러와야 한다.', () => {
    const liveCount = 10;
    const live: Live = Live.getInstance();
    getMockLiveDataList(liveCount).forEach((mockData) => live.data.set(mockData.broadcastId, mockData));

    const testList1 = service.getRandomLiveList(liveCount + 10);

    expect(testList1.length).toBe(liveCount);
    live.data.clear();
  });

  it('방송 시작 요청이 왔을 때 해당 Broadcast Id로 이미 방송 중이라면 에러가 발생해야 한다.', () => {
    const live: Live = Live.getInstance();
    getMockLiveDataList(1).forEach((mockData) => live.data.set(mockData.broadcastId, mockData));
    const member = getMockMemberList(1)[0];

    expect(() => {
      service.addLiveData(member);
    }).toThrow();

    live.data.clear();
  });

  it('방송 시작 요청이 왔을 때 해당 Broadcast Id로 방송 중이 아니라면 방송 목록에 등록되어야 한다.', () => {
    const live: Live = Live.getInstance();
    const member = getMockMemberList(1)[0];
    service.addLiveData(member);

    expect(live.data.get(member.broadcast_id)).toBeDefined();

    live.data.clear();
  });

  it('방송 종료 요청이 왔을 때 해당 Broadcast Id로 방송 중이 아니라면 에러가 발생해야 한다.', () => {
    const live: Live = Live.getInstance();
    const member = getMockMemberList(1)[0];

    expect(() => {
      service.removeLiveData(member);
    }).toThrow();

    live.data.clear();
  });

  it('방송 종료 요청이 왔을 때 해당 Broadcast Id로 방송 중이라면 방송 목록에서 제거되어야 한다.', () => {
    const live: Live = Live.getInstance();
    getMockLiveDataList(1).forEach((mockData) => live.data.set(mockData.broadcastId, mockData));
    const member = getMockMemberList(1)[0];
    service.removeLiveData(member);

    expect(live.data.get(member.broadcast_id)).not.toBeDefined();

    live.data.clear();
  });
});
