import dotenv from 'dotenv';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from '@member/member.module';
import { LiveModule } from './live/live.module';
import { GithubAuthModule } from '@github/github.module';
import { AuthModule } from '@auth/auth.module';

dotenv.config();

@Module({
  imports: [MemberModule, GithubAuthModule, AuthModule, LiveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
