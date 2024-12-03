import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, HttpException } from '@nestjs/common';
import { NoNeedLoginGuard, NeedLoginGuard, NeedRefreshTokenGuard } from '@auth/auth.guard';
import { AuthService } from '@auth/auth.service';
import { CookieService } from '@cookie/cookie.service';

describe('Auth Guard', () => {
  let noNeedLoginGuard: NoNeedLoginGuard;
  let needLoginGuard: NeedLoginGuard;
  let needRefreshTokenGuard: NeedRefreshTokenGuard;

  const authService = {
    verifyToken: jest.fn(),
    getRefreshToken: jest.fn(),
  };

  const cookieService = {
    clearCookie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoNeedLoginGuard,
        NeedLoginGuard,
        NeedRefreshTokenGuard,
        { provide: AuthService, useValue: authService },
        { provide: CookieService, useValue: cookieService },
      ],
    }).compile();

    noNeedLoginGuard = module.get<NoNeedLoginGuard>(NoNeedLoginGuard);
    needLoginGuard = module.get<NeedLoginGuard>(NeedLoginGuard);
    needRefreshTokenGuard = module.get<NeedRefreshTokenGuard>(NeedRefreshTokenGuard);
  });

  describe('NoNeedLoginGuard', () => {
    it('Access Token이 없으면 접근을 허용해야 한다.', () => {
      const context = createMockExecutionContext({});
      expect(noNeedLoginGuard.canActivate(context)).toBe(true);
    });

    it('Access Token이 문자열로 Null일 때도 접근을 허용해야 한다.', () => {
      const context = createMockExecutionContext({
        headers: { authorization: 'Bearer null' },
      });
      expect(noNeedLoginGuard.canActivate(context)).toBe(true);
    });

    it('Access Token이 유효하면 예외를 발생시켜야 한다.', () => {
      authService.verifyToken.mockReturnValue(true);
      const context = createMockExecutionContext({
        headers: { authorization: 'Bearer accessToken' },
      });

      expect(() => noNeedLoginGuard.canActivate(context)).toThrow(HttpException);
      expect(() => noNeedLoginGuard.canActivate(context)).toThrow('이미 로그인이 되어있습니다.');
    });
  });

  describe('NeedLoginGuard', () => {
    it('Access Token이 없으면 예외를 발생시켜야 한다.', () => {
      const context = createMockExecutionContext({
        headers: { authorization: 'Bearer null' },
      });

      expect(() => needLoginGuard.canActivate(context)).toThrow(HttpException);
      expect(() => needLoginGuard.canActivate(context)).toThrow('로그인이 필요합니다.');
    });

    it('Access Token이 유효하면 접근을 허용해야 한다.', () => {
      authService.verifyToken.mockReturnValue(true);
      const mockContext = createMockExecutionContext({
        headers: { authorization: 'Bearer accessToken' },
      });

      expect(needLoginGuard.canActivate(mockContext)).toBe(true);
    });
  });

  describe('NeedRefreshTokenGuard', () => {
    it('Refresh Token이 유효하지 않으면 예외를 발생시켜야 한다.', async () => {
      const context = createMockExecutionContext({});

      await expect(needRefreshTokenGuard.canActivate(context)).rejects.toThrow(HttpException);
      await expect(needRefreshTokenGuard.canActivate(context)).rejects.toThrow('로그인이 필요합니다.');
    });

    it('Refresh Token이 유효하면 접근을 허용해야 한다.', async () => {
      const payload = { memberId: '123' };
      authService.verifyToken.mockReturnValue(payload);
      authService.getRefreshToken.mockResolvedValue('refreshToken');

      const context = createMockExecutionContext({
        cookies: { refreshToken: 'refreshToken' },
      });

      await expect(needRefreshTokenGuard.canActivate(context)).resolves.toBe(true);
    });

    it('저장된 리프레시 토큰과 불일치하면 예외가 발생한다.', async () => {
      const payload = { memberId: '123' };
      authService.verifyToken.mockReturnValue(payload);
      authService.getRefreshToken.mockResolvedValue('refreshToken');

      const context = createMockExecutionContext({
        cookies: { refreshToken: 'refreshToken123' },
      });

      await expect(needRefreshTokenGuard.canActivate(context)).rejects.toThrow(HttpException);
      await expect(needRefreshTokenGuard.canActivate(context)).rejects.toThrow('만료된 Refresh Token 입니다.');
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
