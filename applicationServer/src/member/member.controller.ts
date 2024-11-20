import { Controller, Get, UseGuards } from '@nestjs/common';
import { MemberService } from '@member/member.service';
import { NeedLoginGuard } from '@src/auth/core/auth.guard';

@Controller('members')
@UseGuards(NeedLoginGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getMembers() {
    return this.memberService.findMembers();
  }
}
