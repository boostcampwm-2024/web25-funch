import { Module } from '@nestjs/common';
import { GithubAuthController } from '@github/github.controller';
import { GithubAuthService } from '@github/github.service';
import { DatabaseModule } from '@src/database/database.module';
import { MemberModule } from '@src/member/member.module';
import { AuthModule } from '@auth/auth.module';
import { CookieModule } from '@cookie/cookie.module';

@Module({
  imports: [DatabaseModule, MemberModule, AuthModule, CookieModule],
  controllers: [GithubAuthController],
  providers: [GithubAuthService],
})
export class GithubAuthModule {}
