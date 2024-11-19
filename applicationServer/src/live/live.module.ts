import { Module } from '@nestjs/common';
import { LiveService } from '@live/live.service';
import { LiveController } from '@live/live.controller';
import { MemberModule } from '@src/member/member.module';

@Module({
  imports: [MemberModule],
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}
