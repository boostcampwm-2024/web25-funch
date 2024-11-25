import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Follow } from '@follow/follow.entity';
import { FOLLOW_REPOSITORY } from '@src/constants';
import crypto from 'crypto';

@Injectable()
export class FollowService {
  constructor(
    @Inject(FOLLOW_REPOSITORY)
    private readonly followRepository: Repository<Follow>,
  ) {}

  async findOneFollowWithCondition(condition: { [key: string]: string }) {
    return this.followRepository.findOne({ where: condition });
  }

  async followMember(follower: string, following: string) {
    const follow = { id: crypto.randomUUID(), follower, following };
    await this.followRepository.save(follow);
  }

  async unfollowMember(follower: string, following: string) {
    return this.followRepository.delete({ follower, following });
  }
}
