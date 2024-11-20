import { Controller, Get, Post, Param, Query, Body, HttpCode, Sse, Req } from '@nestjs/common';
import { LiveService } from '@live/live.service';
import { SUGGEST_LIVE_COUNT } from '@src/constants';
import { Observable } from 'rxjs';
import { Broadcast } from '@src/types';
import { Request } from 'express';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get('/list')
  getLivelistAlignViewerCount(@Query('start') start: number, @Query('end') end: number) {
    return this.liveService.getLiveList(start, end);
  }

  @Get(':broadcastId')
  getPlaylistUrl(@Param('broadcastId') broadcastId: string) {
    return this.liveService.responseLiveData(broadcastId);
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

  @Sse('/sse/:broadcastId')
  intervalNotifyBroadcastData(@Param('broadcastId') broadcastId, @Req() req: Request): Observable<{ data: Broadcast }> {
    return this.liveService.notifyLiveDataInterval(broadcastId, req);
  }
}
