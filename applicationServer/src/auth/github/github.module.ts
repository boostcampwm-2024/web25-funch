import { Module } from '@nestjs/common';
import { GithubAuthController } from '@auth/github/github.controller';
import { GithubAuthService } from '@auth/github/github.service';
import { MemberService } from '@src/member/member.service';
import { memberProvider } from '@src/member/member.providers';
import { databaseProvider } from '@database/database.providers';

@Module({
  controllers: [GithubAuthController],
  providers: [GithubAuthService, databaseProvider, memberProvider, MemberService],
})
export class GithubAuthModule {}
