import { Controller, Post, UseGuards, Body, Delete, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { NeedLoginGuard } from '@src/auth/core/auth.guard';
import { FollowService } from '@follow/follow.service';

@Controller('follow')
@UseGuards(NeedLoginGuard)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  @HttpCode(201)
  async followMember(@Body('follower') follower: string, @Body('following') following: string) {
    const isAlreadyFollowing = await this.followService.findOneFollowWithCondition({ follower, following });
    if (isAlreadyFollowing) throw new HttpException('이미 팔로우 중입니다.', HttpStatus.BAD_REQUEST);

    await this.followService.followMember(follower, following);
  }

  @Delete()
  @HttpCode(204)
  async unfollowMember(@Body('follower') follower: string, @Body('following') following: string) {
    const result = await this.followService.unfollowMember(follower, following);
    if (result.affected === 0) {
      throw new HttpException('팔로우 중이지 않습니다.', HttpStatus.BAD_REQUEST);
    }
  }
}
