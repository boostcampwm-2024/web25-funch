import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '../cookie/cookie.service';
import { REFRESH_TOKEN } from '@src/constants';

@Injectable()
class NoNeedLoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['authorization']?.split(' ')[1];

    if (accessToken == 'null') return true;
    if (accessToken && this.authService.verifyToken(accessToken)) {
      throw new HttpException('이미 로그인이 되어있습니다.', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}

@Injectable()
class NeedLoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['authorization']?.split(' ')[1];

    if (!accessToken) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }
    this.authService.verifyToken(accessToken);
    return true;
  }
}

@Injectable()
class NeedRefreshTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const refreshToken = request.cookies?.['refreshToken'];

    if (!refreshToken) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }

    const payload = this.authService.verifyToken(refreshToken);
    const savedRefreshToken = this.authService.getRefreshToken(payload.memberId);
    if (savedRefreshToken !== refreshToken) {
      this.cookieService.clearCookie(response, REFRESH_TOKEN);
      throw new HttpException('만료된 Refresh Token 입니다.', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}

export { NoNeedLoginGuard, NeedLoginGuard, NeedRefreshTokenGuard };
