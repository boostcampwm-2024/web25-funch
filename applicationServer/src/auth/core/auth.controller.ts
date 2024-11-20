import dotenv from 'dotenv';
import { Controller, Get, Res, Req, Redirect, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '@cookie/cookie.service';
import { NeedLoginGuard } from '@auth/auth.guard';
import { REFRESH_TOKEN } from '@src/constants';

dotenv.config();

@Controller('auth')
class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Get('/refresh')
  @UseGuards(NeedLoginGuard)
  async refreshAccessToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const oldRefreshToken = req.cookies[REFRESH_TOKEN];
    const payload = this.authService.verifyToken(oldRefreshToken);

    const accessToken = this.authService.generateAccessToken(payload.memberId);
    const refreshToken = this.authService.generateRefreshToken(payload.memberId);

    this.authService.saveRefreshToken(payload.memberId, refreshToken);
    this.cookieService.setCookie(res, REFRESH_TOKEN, refreshToken);

    return { accessToken };
  }

  @Get('/logout')
  @Redirect('/', 302)
  @UseGuards(NeedLoginGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.cookieService.clearCookie(res, REFRESH_TOKEN);
  }
}

export { AuthController };
