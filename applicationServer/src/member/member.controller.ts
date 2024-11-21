import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MemberService } from '@member/member.service';
import { NeedLoginGuard } from '@src/auth/core/auth.guard';
import { Request } from 'express';
import { AuthService } from '@src/auth/core/auth.service';

@Controller('members')
@UseGuards(NeedLoginGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getMembers() {
    return this.memberService.findMembers();
  }

  @Get('/mydata')
  getMyData(@Req() req: Request) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const decodedPayload = this.authService.verifyToken(accessToken);
    return this.memberService.findOneMemberWithCondition({ id: decodedPayload.memberId });
  }
}
