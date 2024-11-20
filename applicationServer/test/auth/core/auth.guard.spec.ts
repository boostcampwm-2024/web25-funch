import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { NoNeedLoginGuard, NeedLoginGuard, NeedRefreshTokenGuard } from '@auth/auth.guard';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '@cookie/cookie.service';
import { REFRESH_TOKEN } from '@src/constants';

describe('Auth Guard', () => {
  let authService: Partial<AuthService>;
  let cookieService: Partial<CookieService>;

  beforeEach(() => {
    authService = {
      verifyToken: jest.fn(),
      getRefreshToken: jest.fn(),
    };

    cookieService = {
      clearCookie: jest.fn(),
    };
  });

  describe('NoNeedLoginGuard', () => {
    let guard: NoNeedLoginGuard;

    beforeEach(() => {
      guard = new NoNeedLoginGuard(authService as AuthService);
    });

    it('Access Token이 없으면 접근을 허용해야 한다.', () => {
      const context = createMockExecutionContext({});
      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('Access Token이 유효하면 예외를 발생시켜야 한다.', () => {
      (authService.verifyToken as jest.Mock).mockReturnValue(true);

      const context = createMockExecutionContext({
        headers: { authorization: 'Bearer accessToken' },
      });

      expect(() => guard.canActivate(context)).toThrow(
        new HttpException('이미 로그인이 되어있습니다.', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('NeedLoginGuard', () => {
    let guard: NeedLoginGuard;

    beforeEach(() => {
      guard = new NeedLoginGuard(authService as AuthService);
    });

    it('Access Token이 없으면 예외를 발생시켜야 한다.', () => {
      const context = createMockExecutionContext({});
      expect(() => guard.canActivate(context)).toThrow(
        new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED),
      );
    });

    it('Access Token이 유효하면 접근을 허용해야 한다.', () => {
      (authService.verifyToken as jest.Mock).mockReturnValue(true);

      const context = createMockExecutionContext({
        headers: { authorization: 'Bearer accessToken' },
      });

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(authService.verifyToken).toHaveBeenCalledWith('accessToken');
    });
  });

  describe('NeedRefreshTokenGuard', () => {
    let guard: NeedRefreshTokenGuard;

    beforeEach(() => {
      guard = new NeedRefreshTokenGuard(authService as AuthService, cookieService as CookieService);
    });

    it('Refresh Token이 없으면 예외를 발생시켜야 한다.', () => {
      const context = createMockExecutionContext({ cookies: {} });
      expect(() => guard.canActivate(context)).toThrow(
        new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED),
      );
    });

    it('Refresh Token이 유효하지 않으면 예외를 발생시켜야 한다.', () => {
      const context = createMockExecutionContext({
        cookies: { refreshToken: 'refreshToken' },
      });
      (authService.verifyToken as jest.Mock).mockReturnValue({ memberId: '123' });
      (authService.getRefreshToken as jest.Mock).mockReturnValue('invalidRefreshToken');

      expect(() => guard.canActivate(context)).toThrow(
        new HttpException('만료된 Refresh Token 입니다.', HttpStatus.UNAUTHORIZED),
      );
      expect(cookieService.clearCookie).toHaveBeenCalledWith(context.switchToHttp().getResponse(), REFRESH_TOKEN);
    });

    it('Refresh Token이 유효하면 접근을 허용해야 한다.', () => {
      const context = createMockExecutionContext({
        cookies: { refreshToken: 'refreshToken' },
      });
      (authService.verifyToken as jest.Mock).mockReturnValue({ memberId: '123' });
      (authService.getRefreshToken as jest.Mock).mockReturnValue('refreshToken');

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(authService.verifyToken).toHaveBeenCalledWith('refreshToken');
    });
  });

  function createMockExecutionContext(requestMock: Partial<any>): ExecutionContext {
    return {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          headers: requestMock.headers || {},
          cookies: requestMock.cookies || {},
        })),
        getResponse: jest.fn(() => ({})),
      })),
    } as unknown as ExecutionContext;
  }
});
