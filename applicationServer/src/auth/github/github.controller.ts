import dotenv from 'dotenv';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { MemberService } from '@src/member/member.service';
import { GithubAuthService } from '@auth/github/github.service';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '@auth/cookie/cookie.service';
import { REFRESH_TOKEN } from '@src/constants';

dotenv.config();

// TODO: strategy 적용
// TODO: cors 적용?
@Controller('auth/github')
class GithubAuthController {
  constructor(
    private readonly githubAuthService: GithubAuthService,
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Get('/callback')
  async getAccessToken(@Query('code') code: string, @Res({ passthrough: true }) res: Response) {
    const githubAccessToken = await this.githubAuthService.getAccessToken(code);
    const { id, avatar_url } = await this.githubAuthService.getUserInfo(githubAccessToken);

    const memberId = `Github@${id}`;
    if (!(await this.memberService.existsById(memberId))) {
      await this.memberService.save(memberId, avatar_url);
    }

    const accessToken = this.authService.generateAccessToken(memberId);
    const refreshToken = this.authService.generateRefreshToken(memberId);
    this.authService.saveRefreshToken(memberId, refreshToken);
    this.cookieService.setCookie(res, REFRESH_TOKEN, refreshToken);

    return { accessToken, profileImage: avatar_url };
  }
}

export { GithubAuthController };
