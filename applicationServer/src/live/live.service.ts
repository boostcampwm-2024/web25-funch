import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Live } from '@live/entities/live.entity';
import { Broadcast } from '@src/types';
import { MemberService } from '@src/member/member.service';
import { Member } from '@src/member/member.entity';
import { interval, map } from 'rxjs';
import { NOTIFY_LIVE_DATA_INTERVAL_TIME } from '@src/constants';
import { Request } from 'express';
import { uploadData } from '@src/storage/storage.repository';
import { registerMockLive } from './mock/register-mock.util';

@Injectable()
export class LiveService {
  live: Live;
  constructor(private readonly memberService: MemberService) {
    this.live = Live.getInstance();
    registerMockLive(this.live);
  }

  getLiveList(start, end) {
    const alignLiveList = Array.from(this.live.data.values()).sort((a, b) => b.viewerCount - a.viewerCount);
    return alignLiveList.slice(start, end ?? alignLiveList.length);
  }

  responseLiveData(broadcastId) {
    if (!this.live.data.has(broadcastId)) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const createMultivariantPlaylistUrl = (id) =>
      `https://kr.object.ncloudstorage.com/media-storage/${id}/master_playlist.m3u8`;

    const broadcastData = this.live.data.get(broadcastId);
    const playlistUrl = createMultivariantPlaylistUrl(broadcastId);

    return { playlistUrl, broadcastData };
  }

  getRandomLiveList(count) {
    const allLives = Array.from(this.live.data.values());
    if (allLives.length <= count) return allLives;

    const result: Broadcast[] = [];
    while (result.length < count) {
      const history = {};
      const randomCount = Math.floor(allLives.length * Math.random());

      if (!history[randomCount]) {
        result.push(allLives[randomCount]);
        history[randomCount] = true;
      }
    }

    return result;
  }

  async verifyStreamKey(streamKey) {
    const member = await this.memberService.findOneMemberWithCondition({ stream_key: streamKey });
    if (!member) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return member;
  }

  addLiveData(member: Member) {
    if (this.live.data.has(member.broadcast_id)) throw new HttpException('Conflict', HttpStatus.CONFLICT);

    this.live.data.set(member.broadcast_id, {
      broadcastId: member.broadcast_id,
      title: `${member.name}의 라이브 방송`,
      contentCategory: '',
      moodCategory: '',
      tags: [],
      thumbnailUrl: `https://kr.object.ncloudstorage.com/media-storage/${member.broadcast_id}/dynamic_thumbnail.jpg`,
      viewerCount: 0,
      userName: member.name,
      profileImageUrl: member.profile_image,
    });
  }

  removeLiveData(member: Member) {
    if (!this.live.data.has(member.broadcast_id)) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    this.live.data.delete(member.broadcast_id);
  }

  async updateLiveData(tokenPayload, requestBody) {
    const member = await this.memberService.findOneMemberWithCondition({ id: tokenPayload.memberId });
    if (this.live.data.has(member.broadcast_id)) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    if (requestBody.thumbnail) {
      const imageData = Buffer.from(requestBody.thumbnail, 'base64');
      uploadData(`${member.broadcast_id}/static_thumbnail.jpg`, imageData);
    }

    const memberLiveData = this.live.data.get(member.broadcast_id);
    memberLiveData.title = requestBody.title;
    memberLiveData.contentCategory = requestBody.contentCategory;
    memberLiveData.moodCategory = requestBody.moodCategory;
    memberLiveData.tags = requestBody.tags;
    memberLiveData.thumbnailUrl = requestBody.thumbnail
      ? `https://kr.object.ncloudstorage.com/media-storage/${member.broadcast_id}/static_thumbnail.jpg`
      : `https://kr.object.ncloudstorage.com/media-storage/${member.broadcast_id}/dynamic_thumbnail.jpg`;
  }

  notifyLiveDataInterval(broadcastId: string, req: Request) {
    if (!this.live.data.has(broadcastId)) throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    this.live.data.get(broadcastId).viewerCount++;

    req.on('close', () => {
      this.live.data.get(broadcastId).viewerCount--;
    });

    return interval(NOTIFY_LIVE_DATA_INTERVAL_TIME).pipe(map(() => ({ data: this.live.data.get(broadcastId) })));
  }
}
