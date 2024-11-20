import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('generateAccessToken', () => {
    it('Access Token을 생성해야 한다.', () => {
      const memberId = '123';
      const accessToken = 'accessToken';
      process.env.ACCESS_TOKEN_EXPIRE = '1h';

      mockJwtService.sign.mockReturnValue(accessToken);

      const result = authService.generateAccessToken(memberId);

      expect(result).toBe(accessToken);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ memberId }, { expiresIn: '1h' });
    });
  });

  describe('generateRefreshToken', () => {
    it('Refresh Token을 생성해야 한다.', () => {
      const memberId = '123';
      const refreshToken = 'refreshToken';
      process.env.REFRESH_TOKEN_EXPIRE = '7d';

      mockJwtService.sign.mockReturnValue(refreshToken);

      const result = authService.generateRefreshToken(memberId);

      expect(result).toBe(refreshToken);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ memberId }, { expiresIn: '7d' });
    });
  });

  describe('verifyToken', () => {
    it('유효한 토큰을 검증해야 한다.', () => {
      const token = 'token';
      const payload = { memberId: '123' };

      mockJwtService.verify.mockReturnValue(payload);

      const result = authService.verifyToken(token);

      expect(result).toBe(payload);
      expect(mockJwtService.verify).toHaveBeenCalledWith(token);
    });

    it('유효하지 않은 토큰에 대해 예외를 발생시켜야 한다.', () => {
      const token = 'token';
      const error = new Error('Invalid token Error');

      mockJwtService.verify.mockImplementation(() => {
        throw error;
      });

      expect(() => authService.verifyToken(token)).toThrow(
        new HttpException(`Token이 유효하지 않습니다 : ${error}`, HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('saveRefreshToken', () => {
    it('Refresh Token을 저장해야 한다.', () => {
      const memberId = '123';
      const token = 'refreshToken';

      authService.saveRefreshToken(memberId, token);

      expect(authService.getRefreshToken(memberId)).toBe(token);
    });
  });

  describe('getRefreshToken', () => {
    it('저장된 Refresh Token을 반환해야 한다.', () => {
      const memberId = '123';
      const token = 'refreshToken';

      authService.saveRefreshToken(memberId, token);

      const result = authService.getRefreshToken(memberId);

      expect(result).toBe(token);
    });
  });

  describe('removeRefreshToken', () => {
    it('Refresh Token을 삭제해야 한다.', () => {
      const memberId = '123';
      const token = 'refreshToken';

      authService.saveRefreshToken(memberId, token);
      authService.removeRefreshToken(memberId);

      expect(authService.getRefreshToken(memberId)).toBeUndefined();
    });
  });
});
