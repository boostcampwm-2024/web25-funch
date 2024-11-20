import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from '@member/member.entity';
import { MEMBER_REPOSITORY, DEFAULT_PROFILE_IMAGE } from '@src/constants';
import { generateRandomName } from '@src/auth/util/name';
import crypto from 'crypto';

@Injectable()
class MemberService {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private memberRepository: Repository<Member>,
  ) {}

  async findMembers() {
    return this.memberRepository.find();
  }

  async findOneMemberWithCondition(condition: { [key: string]: string }) {
    return this.memberRepository.findOne({ where: condition });
  }

  async save(id: string, image_url?: string): Promise<Member> {
    const name = this.generateUniqueName();
    const user = {
      id,
      name,
      profile_image: image_url || DEFAULT_PROFILE_IMAGE,
      stream_key: crypto.randomUUID(),
      broadcast_id: crypto.randomUUID(),
      follower_count: 0,
    };

    return this.memberRepository.save(user);
  }

  private generateUniqueName() {
    let name = generateRandomName();
    while (!this.findOneMemberWithCondition({ name })) {
      name = generateRandomName();
    }
    return name;
  }
}

export { MemberService };
