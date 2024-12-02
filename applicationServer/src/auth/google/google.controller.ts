import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { MemberService } from '@src/member/member.service';
import { GoogleAuthService } from '@google/google.service';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '@cookie/cookie.service';
import { NoNeedLoginGuard } from '@auth/auth.guard';
import { REFRESH_TOKEN } from '@src/constants';

@Controller('auth/google')
class GoogleAuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('/callback')
  @UseGuards(NoNeedLoginGuard)
  async getAccessToken(@Body('code') code: string, @Res({ passthrough: true }) res: Response) {
    const googleAccessToken = await this.googleAuthService.getAccessToken(decodeURIComponent(code));
    const { id, picture } = await this.googleAuthService.getUserInfo(googleAccessToken);

    const member = await this.memberService.findOrRegisterMember(`Google@${id}`, picture);
    const accessToken = this.authService.generateAccessToken(member.id);
    const refreshToken = this.authService.generateRefreshToken(member.id);

    await this.authService.saveRefreshToken(member.id, refreshToken);
    this.cookieService.setCookie(res, REFRESH_TOKEN, refreshToken);

    return { accessToken, name: member.name, profile_image: member.profile_image, broadcast_id: member.broadcast_id };
  }
}

export { GoogleAuthController };
