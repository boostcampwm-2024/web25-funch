import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MemberService } from '@member/member.service';
import { NeedLoginGuard } from '@src/auth/core/auth.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('members')
@UseGuards(NeedLoginGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getMembers() {
    return this.memberService.findMembers();
  }

  @Get('/mydata')
  getMyData(@Req() req: Request) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const decodedPayload = this.jwtService.decode(accessToken);
    return this.memberService.findOneMemberWithCondition({ id: decodedPayload.memberId });
  }
}
