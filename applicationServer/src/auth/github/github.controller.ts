import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { MemberService } from '@src/member/member.service';
import { GithubAuthService } from '@github/github.service';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '@cookie/cookie.service';
import { NoNeedLoginGuard } from '@auth/auth.guard';
import { REFRESH_TOKEN } from '@src/constants';

@Controller('auth/github')
class GithubAuthController {
  constructor(
    private readonly githubAuthService: GithubAuthService,
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Get('/callback')
  @UseGuards(NoNeedLoginGuard)
  async getAccessToken(@Query('code') code: string, @Res({ passthrough: true }) res: Response) {
    const githubAccessToken = await this.githubAuthService.getAccessToken(code);
    const { id, avatar_url } = await this.githubAuthService.getUserInfo(githubAccessToken);

    const memberId = `Github@${id}`;
    if (!(await this.memberService.findOneMemberWithCondition({ id: memberId }))) {
      await this.memberService.register(memberId, avatar_url);
    }

    const accessToken = this.authService.generateAccessToken(memberId);
    const refreshToken = this.authService.generateRefreshToken(memberId);
    this.authService.saveRefreshToken(memberId, refreshToken);
    this.cookieService.setCookie(res, REFRESH_TOKEN, refreshToken);

    return { accessToken, profileImage: avatar_url };
  }
}

export { GithubAuthController };
