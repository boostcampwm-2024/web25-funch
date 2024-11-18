import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';

@Module({
  imports: [MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
