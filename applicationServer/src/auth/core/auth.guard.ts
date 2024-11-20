import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';

@Injectable()
class NoNeedLoginGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['authorization']?.split(' ')[1];
    const refreshToken = request.cookies?.['refreshToken'];

    if (accessToken || refreshToken) {
      throw new HttpException('이미 로그인이 되어있습니다.', HttpStatus.FORBIDDEN);
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
    const refreshToken = request.cookies?.['refreshToken'];

    if (!accessToken || !refreshToken) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }

    const accessTokenPayload = this.authService.verifyToken(accessToken);
    const refreshTokenPayload = this.authService.verifyToken(refreshToken);
    if (!accessTokenPayload || !refreshTokenPayload) {
      throw new HttpException('Token이 유효하지 않습니다.', HttpStatus.FORBIDDEN);
    }

    const savedRefreshToken = this.authService.getRefreshToken(refreshTokenPayload.memberId);
    if (savedRefreshToken !== refreshToken) {
      throw new HttpException('만료된 Refresh Token 입니다.', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}

export { NoNeedLoginGuard, NeedLoginGuard };
