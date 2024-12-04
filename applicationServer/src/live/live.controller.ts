import { Controller, Get, Post, Param, Query, Body, HttpCode, Sse, Req, UseGuards, Patch } from '@nestjs/common';
import { LiveService } from '@live/live.service';
import { SUGGEST_LIVE_COUNT } from '@src/constants';
import { Observable } from 'rxjs';
import { Broadcast } from '@src/types';
import { Request } from 'express';
import { NeedLoginGuard } from '@src/auth/core/auth.guard';
import { AuthService } from '@src/auth/core/auth.service';

@Controller('live')
export class LiveController {
  constructor(
    private readonly liveService: LiveService,
    private readonly authService: AuthService,
  ) {}

  @Get('/list')
  getLiveListAlignViewerCount(@Query('start') start: number, @Query('end') end: number) {
    return this.liveService.getLiveList(start, end);
  }

  @Get('/category')
  async getCategoryLiveList(@Query() query) {
    const liveList = await this.liveService.getLiveList(0);
    return this.liveService.filterWithCategory(liveList, query);
  }

  @UseGuards(NeedLoginGuard)
  @Get('/follow')
  getFollowLiveList(@Req() req: Request) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const decodedPayload = this.authService.verifyToken(accessToken);

    return this.liveService.filterWithFollow(decodedPayload.memberId);
  }

  @Get(':broadcastId')
  getPlaylistUrl(@Param('broadcastId') broadcastId: string) {
    return this.liveService.responseLiveData(broadcastId);
  }

  @Get('/list/suggest')
  getSuggestLiveList() {
    return { suggest: this.liveService.getRandomLiveList(SUGGEST_LIVE_COUNT) };
  }

  @Post('/start')
  @HttpCode(200)
  async startLive(@Body('streamKey') streamKey: string, @Body('internalPath') internalPath: string) {
    const member = await this.liveService.verifyStreamKey(streamKey);
    this.liveService.addLiveData(member, internalPath);
    return { broadcastId: member.broadcast_id };
  }

  @Post('/end')
  @HttpCode(200)
  async endLive(@Body('streamKey') streamKey) {
    const member = await this.liveService.verifyStreamKey(streamKey);
    this.liveService.removeLiveData(member);
    return { broadcastId: member.broadcast_id };
  }

  @UseGuards(NeedLoginGuard)
  @Patch('/update')
  @HttpCode(200)
  updateLive(@Req() req: Request, @Body() body) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const decodedPayload = this.authService.verifyToken(accessToken);
    return this.liveService.updateLiveData(decodedPayload, body);
  }

  @Sse('/sse/:broadcastId')
  async intervalNotifyBroadcastData(
    @Param('broadcastId') broadcastId,
    @Req() req: Request,
  ): Promise<Observable<Promise<{ data: Broadcast }>>> {
    return await this.liveService.notifyLiveDataInterval(broadcastId, req);
  }
}
