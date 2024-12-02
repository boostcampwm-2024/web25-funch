import { Test, TestingModule } from '@nestjs/testing';
import { LiveService } from '@live/live.service';
import { Live } from '@live/entities/live.entity';
import { Broadcast } from '@src/types';
import { Member } from '@src/member/member.entity';
import { MemberService } from '@src/member/member.service';

function getMockLiveDataList(count) {
  const dummy = new Array(count).fill(0);
  const result: Broadcast[] = dummy.map((e, i) => {
    return {
      broadcastId: `test${i}`,
      broadcastPath: `test${i}/testInternalPath`,
      title: `title${i}`,
      contentCategory: `testContent`,
      moodCategory: `testMood`,
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
    const mockMemberService = {
      findOneMemberWithCondition: jest.fn(),
      findMembersWithFollowTable: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveService, { provide: MemberService, useValue: mockMemberService }],
    }).compile();
    service = module.get<LiveService>(LiveService);
  });

  it('LiveService가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });

  it('생방송 중인 스트리머의 broadcast Id로 playlist를 요청하면 playlist url이 담긴 객체를 반환해야 한다.', () => {
    const live: Live = Live.getInstance();
    const liveList = getMockLiveDataList(1);
    liveList.forEach((mockData) => live.data.set(mockData.broadcastId, mockData));
    const thisLive = liveList[0];

    const result = service.responseLiveData(thisLive.broadcastId);
    const createMultivariantPlaylistUrl = (path) =>
      `https://kr.object.ncloudstorage.com/media-storage/${path}/master_playlist.m3u8`;

    expect(result.playlistUrl).toEqual(createMultivariantPlaylistUrl(thisLive.broadcastPath));
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

    const testList1 = service.getRandomLiveList(liveCount + 100);

    expect(testList1.length).toBe(Array.from(live.data.keys()).length);
    live.data.clear();
  });

  it('방송 시작 요청이 왔을 때 해당 Broadcast Id로 이미 방송 중이라면 에러가 발생해야 한다.', () => {
    const live: Live = Live.getInstance();
    getMockLiveDataList(1).forEach((mockData) => live.data.set(mockData.broadcastId, mockData));
    const member = getMockMemberList(1)[0];

    expect(() => {
      service.addLiveData(member, 'testInternalPath');
    }).toThrow();

    live.data.clear();
  });

  it('방송 시작 요청이 왔을 때 해당 Broadcast Id로 방송 중이 아니라면 방송 목록에 등록되어야 한다.', () => {
    const live: Live = Live.getInstance();
    const member = getMockMemberList(1)[0];
    service.addLiveData(member, 'testInternalPath');

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

  it('콘텐츠 카테고리를 포함한 방송 목록 요청이 왔을 때 해당 카테고리를 가진 방송이 반환되어야 한다.', () => {
    const live: Live = Live.getInstance();
    const liveList = getMockLiveDataList(1);
    liveList.forEach((mockData) => live.data.set(mockData.broadcastId, mockData));
    const thisLive = liveList[0];

    const contentCondition = {
      content: 'testContent',
    };
    const result = service.filterWithCategory(Array.from(live.data.values()), contentCondition);
    expect(result[0]).toEqual(thisLive);
    live.data.clear();
  });

  it('분위기 카테고리를 포함한 방송 목록 요청이 왔을 때 해당 카테고리를 가진 방송이 반환되어야 한다.', () => {
    const live: Live = Live.getInstance();
    const liveList = getMockLiveDataList(1);
    liveList.forEach((mockData) => live.data.set(mockData.broadcastId, mockData));
    const thisLive = liveList[0];

    const moodCondition = {
      mood: 'testMood',
    };
    const result = service.filterWithCategory(Array.from(live.data.values()), moodCondition);
    expect(result[0]).toEqual(thisLive);
    live.data.clear();
  });

  it('카테고리를 포함한 방송 목록 요청이 왔을 때 해당 카테고리를 가진 방송이 없다면 빈 배열이 반환되어야 한다.', () => {
    const live: Live = Live.getInstance();
    getMockLiveDataList(1).forEach((mockData) => live.data.set(mockData.broadcastId, mockData));
    const condition = {
      content: 'aaa',
      mood: 'bbb',
    };
    const result = service.filterWithCategory(Array.from(live.data.values()), condition);
    expect(result.length).toBe(0);
    live.data.clear();
  });
});
