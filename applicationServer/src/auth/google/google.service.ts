import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { AUTHORIZATION_CODE, GOOGLE_ACCESS_TOKEN_URL, APPLICATION_JSON, GOOGLE_RESOURCE_URL } from '@src/constants';

@Injectable()
class GoogleAuthService {
  constructor() {}

  async getAccessToken(code: string): Promise<string> {
    const request = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      grant_type: AUTHORIZATION_CODE,
    };

    const response = await axios
      .post(GOOGLE_ACCESS_TOKEN_URL, request, {
        headers: {
          accept: APPLICATION_JSON,
        },
      })
      .catch(() => {
        throw new HttpException('Google AccessToken 가져오기 실패', HttpStatus.UNAUTHORIZED);
      });

    if (response.data.error) {
      throw new HttpException('Google AccessToken 가져오기 실패', HttpStatus.UNAUTHORIZED);
    }
    return response.data.access_token;
  }

  async getUserInfo(accessToken: string) {
    const { data } = await axios
      .get(GOOGLE_RESOURCE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(() => {
        throw new HttpException('Google 유저 정보 가져오기 실패', HttpStatus.FAILED_DEPENDENCY);
      });
    return data;
  }
}

export { GoogleAuthService };
