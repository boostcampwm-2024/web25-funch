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
}

export { GoogleAuthController };
