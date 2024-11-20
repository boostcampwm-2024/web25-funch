import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ACCESS_TOKEN_URL, APPLICATION_JSON, RESOURCE_URL } from '@src/constants';

@Injectable()
class GithubAuthService {
  constructor() {}

  async getAccessToken(code: string): Promise<string> {
    const request = {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRETS,
    };
    const response = await axios.post(ACCESS_TOKEN_URL, request, {
      headers: {
        accept: APPLICATION_JSON,
      },
    });

    if (response.data.error) {
      throw new HttpException('Github AccessToken 가져오기 실패', HttpStatus.UNAUTHORIZED);
    }
    return response.data.access_token;
  }

  async getUserInfo(accessToken: string) {
    const { data } = await axios.get(RESOURCE_URL, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    return data;
  }
}

export { GithubAuthService };
