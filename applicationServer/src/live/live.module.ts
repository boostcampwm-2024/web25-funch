import { Module } from '@nestjs/common';
import { LiveService } from '@live/live.service';
import { LiveController } from '@live/live.controller';

@Module({
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}
