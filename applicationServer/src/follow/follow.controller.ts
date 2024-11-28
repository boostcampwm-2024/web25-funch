import {
  Controller,
  Post,
  UseGuards,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { NeedLoginGuard } from '@src/auth/core/auth.guard';
import { FollowService } from '@follow/follow.service';
import { FOLLOWER, FOLLOWERS, FOLLOWING } from '@src/constants';
import { MemberService } from '@src/member/member.service';

@Controller('follow')
@UseGuards(NeedLoginGuard)
export class FollowController {
  constructor(
    private readonly followService: FollowService,
    private readonly memberService: MemberService,
  ) {}

  @Post()
  @HttpCode(201)
  async followMember(@Body('follower') follower: string, @Body('following') following: string) {
    if (follower === following) throw new HttpException('본인을 팔로우할 수 없습니다.', HttpStatus.BAD_REQUEST);
    const followerId = (await this.memberService.findOneMemberWithCondition({ broadcast_id: follower })).id;
    const followingId = (await this.memberService.findOneMemberWithCondition({ broadcast_id: following })).id;
    const isAlreadyFollowing = await this.followService.findOneFollowWithCondition({
      follower: followerId,
      following: followingId,
    });
    if (isAlreadyFollowing) throw new HttpException('이미 팔로우 중입니다.', HttpStatus.BAD_REQUEST);

    await this.followService.followMember(followerId, followingId);
    return { response: 'OK' };
  }

  @Delete()
  @HttpCode(204)
  async unfollowMember(@Body('follower') follower: string, @Body('following') following: string) {
    if (follower === following) throw new HttpException('본인을 언팔로우할 수 없습니다.', HttpStatus.BAD_REQUEST);
    const followerId = (await this.memberService.findOneMemberWithCondition({ broadcast_id: follower })).id;
    const followingId = (await this.memberService.findOneMemberWithCondition({ broadcast_id: following })).id;

    const result = await this.followService.unfollowMember(followerId, followingId);
    if (result.affected === 0) {
      throw new HttpException('팔로우 중이지 않습니다.', HttpStatus.BAD_REQUEST);
    }
    return { response: 'OK' };
  }

  @Get(':memberId')
  async getFollows(@Param('memberId') memberId: string, @Query('search') search: string) {
    const { condition, key } = this.getFollowConditions(search, memberId);

    const results = await this.followService.findAllFollowWithCondition(condition);
    const data = results.map((result) => result[key]);

    return { [search]: data };
  }

  private getFollowConditions(search: string, memberId: string) {
    if (search === FOLLOWERS) {
      return { condition: { following: memberId }, key: FOLLOWER };
    } else if (search === FOLLOWING) {
      return { condition: { follower: memberId }, key: FOLLOWING };
    }
    throw new HttpException('올바른 팔로워/팔로잉 리스트 요청이 아닙니다.', HttpStatus.BAD_REQUEST);
  }
}
