import { Controller, Get, Param } from '@nestjs/common';
import { LiveService } from '@live/live.service';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get(':broadcastId')
  getPlaylistUrl(@Param('broadcastId') broadcastId: string) {
    return this.liveService.responsePlaylistUrl(broadcastId);
  }
}
