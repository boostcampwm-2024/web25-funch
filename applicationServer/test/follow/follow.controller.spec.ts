import { Test, TestingModule } from '@nestjs/testing';
import { MemberModule } from '@member/member.module';
import { MemberService } from '@member/member.service';
import { FollowController } from '@follow/follow.controller';
import { FollowService } from '@follow/follow.service';
import { NeedLoginGuard } from '@src/auth/core/auth.guard';
import { HttpException } from '@nestjs/common';

describe('FollowController 테스트', () => {
  let followController: FollowController;
  let followService: FollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MemberModule],
      controllers: [FollowController],
      providers: [
        {
          provide: FollowService,
          useValue: {
            findOneFollowWithCondition: jest.fn(),
            findAllFollowWithCondition: jest.fn(),
            followMember: jest.fn(),
            unfollowMember: jest.fn(),
          },
        },
        {
          provide: MemberService,
          useValue: {
            findOneMemberWithCondition: jest.fn().mockResolvedValue({ id: 'id1', broadcast_id: 'user1' }),
          },
        },
      ],
    })
      .overrideGuard(NeedLoginGuard)
      .useValue({ canActivate: () => true })
      .compile();

    followController = module.get(FollowController);
    followService = module.get(FollowService);
  });

  it('이미 팔로우 중인 상태라면 팔로우할 수 없다.', async () => {
    jest.spyOn(followService, 'findOneFollowWithCondition').mockResolvedValueOnce({
      id: 'id',
      follower: 'user1',
      following: 'user2',
      createdAt: new Date(),
    });

    await expect(followController.followMember('user1', 'user2')).rejects.toThrow(
      new HttpException('이미 팔로우 중입니다.', 400),
    );
  });

  it('본인을 팔로우할 수 없다.', async () => {
    await expect(followController.followMember('user1', 'user1')).rejects.toThrow(
      new HttpException('본인을 팔로우할 수 없습니다.', 400),
    );
  });

  it('팔로우 요청을 정상적으로 처리 할 수 있다.', async () => {
    jest.spyOn(followService, 'findOneFollowWithCondition').mockResolvedValueOnce(undefined);
    jest.spyOn(followService, 'followMember').mockResolvedValueOnce(undefined);

    await expect(followController.followMember('user1', 'user2')).resolves;
  });

  it('언팔로우 요청을 정상적으로 처리 할 수 있다.', async () => {
    jest.spyOn(followService, 'unfollowMember').mockResolvedValueOnce({ affected: 1, raw: {} });

    await expect(followController.unfollowMember('user1', 'user2')).resolves;
  });

  it('특정 유저의 팔로워 리스트를 정상적으로 반환한다.', async () => {
    jest
      .spyOn(followService, 'findAllFollowWithCondition')
      .mockResolvedValueOnce([{ id: 'id', follower: 'user1', following: 'user2', createdAt: new Date() }]);

    const result = await followController.getFollows('user2', 'followers');

    expect(result).toEqual({ followers: ['user1'] });
  });

  it('특정 유저의 팔로잉 리스트를 정상적으로 반환한다.', async () => {
    jest
      .spyOn(followService, 'findAllFollowWithCondition')
      .mockResolvedValueOnce([{ id: 'id', follower: 'user1', following: 'user2', createdAt: new Date() }]);

    const result = await followController.getFollows('user1', 'following');

    expect(result).toEqual({ following: ['user2'] });
  });

  it('특정 유저의 팔로워/팔로잉 리스트 요청이 아닌 요청에 대해서는 예외를 발생시킨다.', async () => {
    await expect(followController.getFollows('user1', 'invalid')).rejects.toThrow(
      new HttpException('올바른 팔로워/팔로잉 리스트 요청이 아닙니다.', 400),
    );
  });
});
