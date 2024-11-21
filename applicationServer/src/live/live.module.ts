import { Module } from '@nestjs/common';
import { LiveService } from '@live/live.service';
import { LiveController } from '@live/live.controller';
import { MemberModule } from '@src/member/member.module';
import { AuthModule } from '@src/auth/core/auth.module';

@Module({
  imports: [MemberModule, AuthModule],
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}
