import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { NAVER_ACCESS_TOKEN_URL, NAVER_RESOURCE_URL } from '@src/constants';

@Injectable()
class NaverAuthService {
  async getAccessToken(code: string, state: string): Promise<string> {
    const TOKEN_REQUEST_URL = [
      NAVER_ACCESS_TOKEN_URL,
      '?grant_type=authorization_code',
      `&client_id=${process.env.NAVER_CLIENT_ID}`,
      `&client_secret=${process.env.NAVER_CLIENT_SECRET}`,
      `&code=${code}`,
      `&state=${state}`,
    ]
      .join('')
      .trim();

    const response = await axios.get(TOKEN_REQUEST_URL).catch(() => {
      throw new HttpException('Naver AccessToken 가져오기 실패', HttpStatus.UNAUTHORIZED);
    });

    if (response.data.error) {
      throw new HttpException('Naver AccessToken 가져오기 실패', HttpStatus.UNAUTHORIZED);
    }
    return response.data.access_token;
  }

  async getUserInfo(accessToken: string) {
    const { data } = await axios
      .get(NAVER_RESOURCE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(() => {
        throw new HttpException('Naver AccessToken 가져오기 실패', HttpStatus.UNAUTHORIZED);
      });

    return data.response;
  }
}

export { NaverAuthService };
