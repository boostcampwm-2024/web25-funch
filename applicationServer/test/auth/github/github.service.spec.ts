import { Test, TestingModule } from '@nestjs/testing';
import { GithubAuthService } from '@github/github.service';
import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ACCESS_TOKEN_URL, APPLICATION_JSON } from '@src/constants';

jest.mock('axios');

describe('GithubAuthService', () => {
  let githubAuthService: GithubAuthService;
  const mockAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubAuthService],
    }).compile();

    githubAuthService = module.get(GithubAuthService);
  });

  describe('getAccessToken', () => {
    it('Github AccessToken을 성공적으로 가져와야 한다', async () => {
      const code = '1234';
      const accessToken = 'accessToken';

      mockAxios.post.mockResolvedValueOnce({
        data: { access_token: accessToken },
      });

      const result = await githubAuthService.getAccessToken(code);

      expect(mockAxios.post).toHaveBeenCalledWith(
        ACCESS_TOKEN_URL,
        {
          code,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRETS,
        },
        { headers: { accept: APPLICATION_JSON } },
      );
      expect(result).toBe(accessToken);
    });

    it('AccessToken 요청 실패 시 예외를 던져야 한다', async () => {
      const code = '-1';

      mockAxios.post.mockResolvedValueOnce({
        data: { error: 'invalid_request' },
      });

      await expect(githubAuthService.getAccessToken(code)).rejects.toThrow(
        new HttpException('Github AccessToken 가져오기 실패', HttpStatus.UNAUTHORIZED),
      );

      expect(mockAxios.post).toHaveBeenCalledWith(
        ACCESS_TOKEN_URL,
        {
          code,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRETS,
        },
        { headers: { accept: APPLICATION_JSON } },
      );
    });
  });
});
