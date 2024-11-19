import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { LiveModule } from './live/live.module';
import { GithubAuthModule } from '@auth/github/github.module';

@Module({
  imports: [MemberModule, GithubAuthModule, LiveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
