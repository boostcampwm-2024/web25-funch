import { Module } from '@nestjs/common';
import { NaverAuthController } from '@naver/naver.controller';
import { NaverAuthService } from '@naver/naver.service';
import { DatabaseModule } from '@src/database/database.module';
import { MemberModule } from '@src/member/member.module';
import { AuthModule } from '@auth/auth.module';
import { CookieModule } from '@cookie/cookie.module';

@Module({
  imports: [DatabaseModule, MemberModule, AuthModule, CookieModule],
  controllers: [NaverAuthController],
  providers: [NaverAuthService],
})
export class NaverAuthModule {}
