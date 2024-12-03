import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RedisService } from '@database/redis.service';
import { REDIS_REFRESH_TOKEN_EXPIRE } from '@src/constants';

describe('AuthService', () => {
  let authService: AuthService;

  const jwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const redisService = {
    set: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtService,
        },
        {
          provide: RedisService,
          useValue: redisService,
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

      jwtService.sign.mockReturnValue(accessToken);

      const result = authService.generateAccessToken(memberId);

      expect(result).toBe(accessToken);
      expect(jwtService.sign).toHaveBeenCalledWith({ memberId }, { expiresIn: '1h' });
    });
  });

  describe('generateRefreshToken', () => {
    it('Refresh Token을 생성해야 한다.', () => {
      const memberId = '123';
      const refreshToken = 'refreshToken';
      process.env.REFRESH_TOKEN_EXPIRE = '7d';

      jwtService.sign.mockReturnValue(refreshToken);

      const result = authService.generateRefreshToken(memberId);

      expect(result).toBe(refreshToken);
      expect(jwtService.sign).toHaveBeenCalledWith({ memberId }, { expiresIn: '7d' });
    });
  });

  describe('verifyToken', () => {
    it('유효한 토큰을 검증해야 한다.', () => {
      const token = 'token';
      const payload = { memberId: '123' };

      jwtService.verify.mockReturnValue(payload);

      const result = authService.verifyToken(token);

      expect(result).toBe(payload);
      expect(jwtService.verify).toHaveBeenCalledWith(token);
    });

    it('유효하지 않은 토큰에 대해 예외를 발생시켜야 한다.', () => {
      const token = 'token';
      const error = new Error('Invalid token Error');

      jwtService.verify.mockImplementation(() => {
        throw error;
      });

      expect(() => authService.verifyToken(token)).toThrow(
        new HttpException(`Token이 유효하지 않습니다 : ${error}`, HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('saveRefreshToken', () => {
    it('Refresh Token을 저장해야 한다.', async () => {
      const memberId = '123';
      const token = 'refreshToken';

      await authService.saveRefreshToken(memberId, token);

      expect(redisService.set).toHaveBeenCalledWith(memberId, token, REDIS_REFRESH_TOKEN_EXPIRE);
    });
  });

  describe('getRefreshToken', () => {
    it('저장된 Refresh Token을 반환해야 한다.', async () => {
      const memberId = '123';
      const token = 'refreshToken';

      redisService.get.mockResolvedValue(token);

      const result = await authService.getRefreshToken(memberId);

      expect(result).toBe(token);
      expect(redisService.get).toHaveBeenCalledWith(memberId);
    });
  });
});
