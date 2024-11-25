import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { GITHUB_ACCESS_TOKEN_URL, APPLICATION_JSON, GITHUB_RESOURCE_URL } from '@src/constants';

@Injectable()
class GithubAuthService {
  constructor() {}

  async getAccessToken(code: string): Promise<string> {
    const request = {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    };
    const response = await axios
      .post(GITHUB_ACCESS_TOKEN_URL, request, {
        headers: {
          accept: APPLICATION_JSON,
        },
      })
      .catch(() => {
        throw new HttpException('Github AccessToken 가져오기 실패', HttpStatus.UNAUTHORIZED);
      });

    if (response.data.error) {
      throw new HttpException('Github AccessToken 가져오기 실패', HttpStatus.UNAUTHORIZED);
    }
    return response.data.access_token;
  }

  async getUserInfo(accessToken: string) {
    const { data } = await axios
      .get(GITHUB_RESOURCE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(() => {
        throw new HttpException('Github 유저 정보 가져오기 실패', HttpStatus.FAILED_DEPENDENCY);
      });

    return data;
  }
}

export { GithubAuthService };
