import { Controller, Get } from '@nestjs/common';
import { MemberService } from '@member/member.service';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // TODO: 로그인 해야지 접근 가능
  @Get()
  async getMembers() {
    return this.memberService.findMembers();
  }
}
