import { Module } from '@nestjs/common';
import { LiveService } from './live.service';
import { LiveController } from './live.controller';

@Module({
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}
