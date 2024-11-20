import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { CookieService } from '@cookie/cookie.service';
import { STRICT } from '@src/constants';

describe('CookieService', () => {
  let cookieService: CookieService;
  let mockResponse: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookieService],
    }).compile();

    cookieService = module.get(CookieService);

    mockResponse = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as Partial<Response> as jest.Mocked<Response>;
  });

  describe('setCookie', () => {
    it('쿠키를 올바른 옵션으로 설정해야 한다', () => {
      const name = 'cookie';
      const value = '1234';

      cookieService.setCookie(mockResponse, name, value);

      expect(mockResponse.cookie).toHaveBeenCalledWith(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: STRICT,
      });
    });
  });

  describe('clearCookie', () => {
    it('쿠키를 삭제해야 한다', () => {
      const name = 'cookie';

      cookieService.clearCookie(mockResponse, name);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith(name);
    });
  });
});
