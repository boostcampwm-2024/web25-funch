import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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

  async findById(id: string) {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }
    return member;
  }

  async existsById(id: string) {
    return this.memberRepository.existsBy({ id });
  }

  async existsByName(name: string) {
    return this.memberRepository.existsBy({ name });
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
    while (!this.existsByName(name)) {
      name = generateRandomName();
    }
    return name;
  }
}

export { MemberService };
