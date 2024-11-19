import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from '@member/member.entity';
import { MEMBER_REPOSITORY } from '@src/constants';

@Injectable()
class MemberService {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private memberRepository: Repository<Member>,
  ) {}

  async findMembers(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  async findOneMemberWithCondition(condition: { [key: string]: string }) {
    return this.memberRepository.findOne({ where: condition });
  }
}

export { MemberService };
