import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { LiveModule } from './live/live.module';

@Module({
  imports: [MemberModule, LiveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
