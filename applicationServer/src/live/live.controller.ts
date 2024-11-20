import { Controller, Get, Post, Param, Query, Body, HttpCode } from '@nestjs/common';
import { LiveService } from '@live/live.service';
import { SUGGEST_LIVE_COUNT } from '@src/constants';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get('/list')
  getLivelistAlignViewerCount(@Query('start') start: number, @Query('end') end: number) {
    return this.liveService.getLiveList(start, end);
  }

  @Get(':broadcastId')
  getPlaylistUrl(@Param('broadcastId') broadcastId: string) {
    return this.liveService.responsePlaylistUrl(broadcastId);
  }

  @Get('/list/suggest')
  getSuggestLiveList() {
    return { suggest: this.liveService.getRandomLiveList(SUGGEST_LIVE_COUNT) };
  }

  @Post('start')
  @HttpCode(200)
  async startLive(@Body('streamKey') streamKey) {
    const member = await this.liveService.verifyStreamKey(streamKey);
    this.liveService.addLiveData(member);
    return { broadcastId: member.broadcast_id };
  }

  @Post('end')
  async endLive(@Body('streamKey') streamKey) {
    const member = await this.liveService.verifyStreamKey(streamKey);
    this.liveService.removeLiveData(member);
    return { broadcastId: member.broadcast_id };
  }
}
