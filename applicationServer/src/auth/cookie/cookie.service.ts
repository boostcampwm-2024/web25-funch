import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { STRICT } from '@src/constants';

@Injectable()
class CookieService {
  setCookie(response: Response, name: string, value: string) {
    response.cookie(name, value, {
      httpOnly: true,
      secure: true,
      sameSite: STRICT,
    });
  }

  clearCookie(response: Response, name: string) {
    response.clearCookie(name);
  }
}

export { CookieService };
