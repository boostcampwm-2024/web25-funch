import { Module } from '@nestjs/common';
import { GoogleAuthController } from '@google/google.controller';
import { GoogleAuthService } from '@google/google.service';
import { DatabaseModule } from '@src/database/database.module';
import { MemberModule } from '@src/member/member.module';
import { AuthModule } from '@auth/auth.module';
import { CookieModule } from '@cookie/cookie.module';

@Module({
  imports: [DatabaseModule, MemberModule, AuthModule, CookieModule],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
})
export class GoogleAuthModule {}
