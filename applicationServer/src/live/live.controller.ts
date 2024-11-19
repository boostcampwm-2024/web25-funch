import { Controller, Get, Param, Query } from '@nestjs/common';
import { LiveService } from '@live/live.service';
import { SUGGEST_LIVE_COUNT } from '@src/constants';
import { AddMemberInfoToLive } from '@src/utils/interceptor/live.interceptor';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @AddMemberInfoToLive()
  @Get('/list')
  getLivelistAlignViewerCount(@Query('start') start: number, @Query('end') end: number) {
    return this.liveService.getLiveList(start, end);
  }

  @Get(':broadcastId')
  getPlaylistUrl(@Param('broadcastId') broadcastId: string) {
    return this.liveService.responsePlaylistUrl(broadcastId);
  }

  @AddMemberInfoToLive()
  @Get('/list/suggest')
  getSuggestLiveList() {
    return this.liveService.getRandomLiveList(SUGGEST_LIVE_COUNT);
  }
}
