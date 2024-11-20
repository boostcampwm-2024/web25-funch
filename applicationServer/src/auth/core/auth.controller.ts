import dotenv from 'dotenv';
import { Controller, Get, Res, Req, HttpException, HttpStatus, Redirect } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '@cookie/cookie.service';
import { REFRESH_TOKEN } from '@src/constants';

dotenv.config();

@Controller('auth')
class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  // TODO: refresh 토큰이 존재하고, 유효해야지 접근 가능
  @Get('/refresh')
  async refreshAccessToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const oldRefreshToken = req.cookies[REFRESH_TOKEN];
    if (!oldRefreshToken) throw new HttpException('Refresh Token이 존재하지 않습니다.', HttpStatus.UNAUTHORIZED);

    const payload = this.authService.verifyToken(oldRefreshToken);

    const savedRefreshToken = this.authService.getRefreshToken(payload.memberId);
    if (savedRefreshToken !== oldRefreshToken) {
      throw new HttpException('Refresh Token이 유효하지 않습니다.', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.authService.generateAccessToken(payload.memberId);
    const refreshToken = this.authService.generateRefreshToken(payload.memberId);

    this.authService.saveRefreshToken(payload.memberId, refreshToken);
    this.cookieService.setCookie(res, REFRESH_TOKEN, refreshToken);

    return { accessToken };
  }

  // TODO: refresh 토큰이 존재하고, 유효해야지 접근 가능
  @Get('/logout')
  @Redirect('/', 302)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.cookieService.clearCookie(res, REFRESH_TOKEN);
  }
}

export { AuthController };
