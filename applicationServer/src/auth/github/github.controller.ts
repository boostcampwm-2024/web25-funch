import dotenv from 'dotenv';
import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { GithubAuthService } from './github.service';
import { MemberService } from '@src/member/member.service';
import { GITHUB_LOGIN_ID } from '@src/constants';

dotenv.config();

@Controller('auth/github')
export class GithubAuthController {
  constructor(
    private readonly githubAuthService: GithubAuthService,
    private readonly memberService: MemberService,
  ) {}

  @Get('/callback')
  @Redirect('/', 302)
  async getAccessToken(@Query('code') code: string) {
    const accessToken = await this.githubAuthService.getAccessToken(code);
    const { id, avatar_url } = await this.githubAuthService.getUserInfo(accessToken);

    const memberId = GITHUB_LOGIN_ID(id);
    if (!(await this.memberService.existsById(memberId))) {
      const joinMember = await this.memberService.save(memberId, avatar_url);
    }

    // TODO: 로그인 수행
    const loginMember = await this.memberService.findById(memberId);

    // TODO: JWT 적용
  }
}
