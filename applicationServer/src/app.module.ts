import dotenv from 'dotenv';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { MemberModule } from '@member/member.module';
import { LiveModule } from '@live/live.module';
import { GithubAuthModule } from '@github/github.module';
import { AuthModule } from '@auth/auth.module';
import { FollowModule } from '@follow/follow.module';
import { NaverAuthModule } from '@naver/naver.module';

dotenv.config();

@Module({
  imports: [MemberModule, GithubAuthModule, AuthModule, LiveModule, FollowModule, NaverAuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
