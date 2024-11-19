import { Module } from '@nestjs/common';
import { CookieService } from '@auth/cookie/cookie.service';

@Module({
  providers: [CookieService],
  exports: [CookieService],
})
export class CookieModule {}
