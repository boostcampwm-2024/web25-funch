import { Test, TestingModule } from '@nestjs/testing';
import { LiveService } from '@live/live.service';
import { Member } from '@src/member/member.entity';
import { MemberService } from '@src/member/member.service';
import { RedisService } from '@database/redis.service';

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

  const internalPath = 'test';

  const mockRedis = new Map<string, any>();

  const mockMemberService = {
    findOneMemberWithCondition: jest.fn(() => {
      return getMockMemberList(1)[0];
    }),
    findMembersWithFollowTable: jest.fn(),
  };

  const mockRedisService = {
    set: jest.fn((key: string, value) => {
      mockRedis.set(key, value);
    }),
    get: jest.fn((key: string) => {
      return mockRedis.get(key);
    }),
    getMany: jest.fn((keys: string[]) => {
      const result = keys.map((key) => mockRedis.get(key));
      return result;
    }),
    getSetType: jest.fn((key: string) => {
      return mockRedis.get(key) ?? [];
    }),
    addSetType: jest.fn((key: string, value) => {
      const temp: any[] = mockRedis.get(key) ?? [];
      if (!temp.includes(value)) temp.push(value);
      mockRedis.set(key, temp);
    }),
    removeSetType: jest.fn((key: string, value) => {
      const temp: any[] = mockRedis.get(key) ?? [];
      const dataIdx = temp.indexOf(value);
      if (dataIdx != -1) temp.splice(dataIdx, 1);
      mockRedis.set(key, temp);
    }),
    delete: jest.fn((key: string) => {
      mockRedis.delete(key);
    }),
    exists: jest.fn((key: string) => {
      return mockRedis.has(key);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LiveService,
        { provide: MemberService, useValue: mockMemberService },
        { provide: RedisService, useValue: mockRedisService },
      ],
    }).compile();
    service = module.get<LiveService>(LiveService);
  });

  it('LiveService가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });

  it('생방송 중인 스트리머의 broadcast Id로 playlist를 요청하면 playlist url이 담긴 객체를 반환해야 한다.', async () => {
    const mockMember = getMockMemberList(1)[0];

    await service.addLiveData(mockMember, internalPath);

    const expectPlaylistUrl = `https://kr.object.ncloudstorage.com/media-storage/${mockMember.broadcast_id}/${internalPath}/master_playlist.m3u8`;
    const broadcastData = await service.responseLiveData(mockMember.broadcast_id);

    expect(broadcastData.playlistUrl).toBe(expectPlaylistUrl);
    mockRedis.clear();
  });

  it('오프라인 스트리머의 broadcast Id로 playlist를 요청하면 에러가 발생해야 한다.', () => {
    const broadcastId = 'no user';

    expect(async () => {
      await service.responseLiveData(broadcastId);
    }).rejects.toThrow();
  });

  it('생방송 중인 스트리머 리스트를 정해진 개수만큼 랜덤으로 받아와야 한다.', async () => {
    const liveCount = 3;
    const requireCount = 30;
    const mockMembers = getMockMemberList(requireCount);

    for (const member of mockMembers) {
      await service.addLiveData(member, internalPath);
    }

    const testList1 = await service.getRandomLiveList(liveCount);
    const testList2 = await service.getRandomLiveList(liveCount);
    expect(testList1).not.toEqual(testList2);
    mockRedis.clear();
  });

  it('생방송 중인 스트리머 리스트를 랜덤으로 받아올 때 요구 개수보다 전체 생방송 수가 적거나 같으면 전체 생방송 개수만큼 불러와야 한다.', async () => {
    const liveCount = 10;
    const requireCount = 3;
    const mockMembers = getMockMemberList(requireCount);

    for (const member of mockMembers) {
      await service.addLiveData(member, internalPath);
    }

    const testList1 = await service.getRandomLiveList(liveCount);

    const broadcastCountWithoutList = Array.from(mockRedis.keys()).length - 1;

    expect(testList1.length).toBe(broadcastCountWithoutList);
    mockRedis.clear();
  });

  it('방송 시작 요청이 왔을 때 해당 Broadcast Id로 이미 방송 중이라면 에러가 발생해야 한다.', async () => {
    const mockMember = getMockMemberList(1)[0];
    await service.addLiveData(mockMember, internalPath);

    expect(async () => {
      await service.addLiveData(mockMember, internalPath);
    }).rejects.toThrow();
    mockRedis.clear();
  });

  it('방송 시작 요청이 왔을 때 해당 Broadcast Id로 방송 중이 아니라면 방송 목록에 등록되어야 한다.', async () => {
    const mockMember = getMockMemberList(1)[0];
    await service.addLiveData(mockMember, internalPath);

    expect(await service.responseLiveData(mockMember.broadcast_id)).toBeDefined();
    mockRedis.clear();
  });

  it('방송 종료 요청이 왔을 때 해당 Broadcast Id로 방송 중이 아니라면 에러가 발생해야 한다.', () => {
    const mockMember = getMockMemberList(1)[0];

    expect(async () => {
      await service.removeLiveData(mockMember);
    }).rejects.toThrow();
    mockRedis.clear();
  });

  it('방송 종료 요청이 왔을 때 해당 Broadcast Id로 방송 중이라면 방송 목록에서 제거되어야 한다.', async () => {
    const mockMember = getMockMemberList(1)[0];
    await service.addLiveData(mockMember, internalPath);

    await service.removeLiveData(mockMember);

    expect(async () => {
      await service.responseLiveData(mockMember.broadcast_id);
    }).rejects.toThrow();
    mockRedis.clear();
  });

  it('콘텐츠 카테고리를 포함한 방송 목록 요청이 왔을 때 해당 카테고리를 가진 방송이 반환되어야 한다.', async () => {
    const requireCount = 2;
    const mockMembers = getMockMemberList(requireCount);

    for (const member of mockMembers) {
      await service.addLiveData(member, internalPath);
    }

    const mockMember = mockMembers[0];

    await service.updateLiveData(
      { memberId: mockMember.id },
      {
        title: 'test title',
        contentCategory: 'testContent',
        moodCategory: 'testMood',
        tags: [],
      },
    );

    const contentCondition = {
      content: 'testContent',
    };

    const result = service.filterWithCategory(await service.getRandomLiveList(requireCount), contentCondition);
    expect(result[0].broadcastId).toEqual(mockMember.broadcast_id);
    mockRedis.clear();
  });

  it('분위기 카테고리를 포함한 방송 목록 요청이 왔을 때 해당 카테고리를 가진 방송이 반환되어야 한다.', async () => {
    const requireCount = 2;
    const mockMembers = getMockMemberList(requireCount);

    for (const member of mockMembers) {
      await service.addLiveData(member, internalPath);
    }

    const mockMember = mockMembers[0];

    await service.updateLiveData(
      { memberId: mockMember.id },
      {
        title: 'test title',
        contentCategory: 'testContent',
        moodCategory: 'testMood',
        tags: [],
      },
    );

    const moodCondition = {
      mood: 'testMood',
    };

    const result = service.filterWithCategory(await service.getRandomLiveList(requireCount), moodCondition);
    expect(result[0].broadcastId).toEqual(mockMember.broadcast_id);
    mockRedis.clear();
  });

  it('카테고리를 포함한 방송 목록 요청이 왔을 때 해당 카테고리를 가진 방송이 없다면 빈 배열이 반환되어야 한다.', async () => {
    const requireCount = 2;
    const mockMembers = getMockMemberList(requireCount);

    for (const member of mockMembers) {
      await service.addLiveData(member, internalPath);
    }

    const condition = {
      content: 'aaa',
      mood: 'bbb',
    };

    const result = service.filterWithCategory((await service.getRandomLiveList(requireCount)) ?? [], condition);
    expect(result.length).toBe(0);
    mockRedis.clear();
  });
});
