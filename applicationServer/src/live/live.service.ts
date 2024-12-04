import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Broadcast, User } from '@src/types';
import { MemberService } from '@src/member/member.service';
import { Member } from '@src/member/member.entity';
import { interval, map } from 'rxjs';
import { NOTIFY_LIVE_DATA_INTERVAL_TIME, REDIS_LIVE_KEY, REDIS_LIVE_LIST_KEY } from '@src/constants';
import { Request } from 'express';
import { uploadData } from '@src/storage/storage.repository';
import { RedisService } from '@database/redis.service';

@Injectable()
export class LiveService {
  constructor(
    private readonly memberService: MemberService,
    private readonly redisService: RedisService,
  ) {}

  async getLiveList(start, end?) {
    const liveBroadcastIdList = await this.redisService.getSetType(REDIS_LIVE_LIST_KEY);
    const liveList = await this.redisService.getMany(liveBroadcastIdList.map((e) => `${REDIS_LIVE_KEY}${e}`));
    const alignLiveList = Array.from(liveList.map((data) => JSON.parse(data)) as Broadcast[]).sort(
      (a, b) => b.viewerCount - a.viewerCount,
    );

    return alignLiveList.slice(start, end ?? alignLiveList.length);
  }

  async responseLiveData(broadcastId) {
    if (!(await this.redisService.exists(`${REDIS_LIVE_KEY}${broadcastId}`)))
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const createMultivariantPlaylistUrl = (path) =>
      `https://kr.object.ncloudstorage.com/media-storage/${path}/master_playlist.m3u8`;

    const broadcastData: Broadcast = JSON.parse(await this.redisService.get(`${REDIS_LIVE_KEY}${broadcastId}`));
    const playlistUrl = createMultivariantPlaylistUrl(broadcastData.broadcastPath);

    return { playlistUrl, broadcastData };
  }

  async getRandomLiveList(count) {
    const allLives = await this.getLiveList(0);
    if (allLives.length <= count) return allLives;

    const result: Broadcast[] = [];
    const history = {};

    while (result.length < count) {
      const randomCount = Math.floor(allLives.length * Math.random());

      if (!history[randomCount]) {
        result.push(allLives[randomCount]);
        history[randomCount] = true;
      }
    }

    return result;
  }

  async verifyStreamKey(streamKey: string) {
    const member = await this.memberService.findOneMemberWithCondition({ stream_key: streamKey });
    if (!member) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return member;
  }

  async addLiveData(member: Member, internalPath: string) {
    if (await this.redisService.exists(`${REDIS_LIVE_KEY}${member.broadcast_id}`))
      throw new HttpException('Conflict', HttpStatus.CONFLICT);

    const newBroadcastData: Broadcast = {
      broadcastId: member.broadcast_id,
      broadcastPath: `${member.broadcast_id}/${internalPath}`,
      title: `${member.name}의 라이브 방송`,
      contentCategory: null,
      moodCategory: null,
      tags: [],
      thumbnailUrl: `https://kr.object.ncloudstorage.com/media-storage/${member.broadcast_id}/${internalPath}/dynamic_thumbnail.jpg`,
      viewerCount: 0,
      userName: member.name,
      profileImageUrl: member.profile_image,
    };

    await this.redisService.set(`${REDIS_LIVE_KEY}${member.broadcast_id}`, JSON.stringify(newBroadcastData));
    this.redisService.addSetType(REDIS_LIVE_LIST_KEY, member.broadcast_id);
  }

  async removeLiveData(member: Member) {
    if (!(await this.redisService.exists(`${REDIS_LIVE_KEY}${member.broadcast_id}`)))
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    await this.redisService.removeSetType(REDIS_LIVE_LIST_KEY, member.broadcast_id);
    this.redisService.delete(`${REDIS_LIVE_KEY}${member.broadcast_id}`);
  }

  async updateLiveData(tokenPayload, requestBody) {
    const member = await this.memberService.findOneMemberWithCondition({ id: tokenPayload.memberId });
    if (!(await this.redisService.exists(`${REDIS_LIVE_KEY}${member.broadcast_id}`)))
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    const memberLiveData: Broadcast = JSON.parse(
      await this.redisService.get(`${REDIS_LIVE_KEY}${member.broadcast_id}`),
    );

    let fileEXT = '.jpg';
    if (requestBody.thumbnail) {
      const [imageHeader, imageString] = requestBody.thumbnail.split(',');
      const dataType = imageHeader.split(':')[1];
      fileEXT = dataType.match(/^image\/([a-z0-9\-+]+);base64$/)[1];
      const imageData = Buffer.from(imageString, 'base64');
      uploadData(`${memberLiveData.broadcastPath}/static_thumbnail.${fileEXT}`, imageData);
    }

    memberLiveData.title = requestBody.title;
    memberLiveData.contentCategory = requestBody.contentCategory;
    memberLiveData.moodCategory = requestBody.moodCategory;
    memberLiveData.tags = requestBody.tags;
    memberLiveData.thumbnailUrl = requestBody.thumbnail
      ? `https://kr.object.ncloudstorage.com/media-storage/${memberLiveData.broadcastPath}/static_thumbnail.${fileEXT}`
      : `https://kr.object.ncloudstorage.com/media-storage/${memberLiveData.broadcastPath}/dynamic_thumbnail.jpg`;

    this.redisService.set(`${REDIS_LIVE_KEY}${member.broadcast_id}`, JSON.stringify(memberLiveData));
  }

  async notifyLiveDataInterval(broadcastId: string, req: Request) {
    if (!(await this.redisService.exists(`${REDIS_LIVE_KEY}${broadcastId}`)))
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);

    const thisLiveData: Broadcast = JSON.parse(await this.redisService.get(`${REDIS_LIVE_KEY}${broadcastId}`));
    thisLiveData.viewerCount++;
    this.redisService.set(`${REDIS_LIVE_KEY}${broadcastId}`, JSON.stringify(thisLiveData));

    req.on('close', async () => {
      if (await this.redisService.exists(`${REDIS_LIVE_KEY}${broadcastId}`)) {
        const thisLiveData: Broadcast = JSON.parse(await this.redisService.get(`${REDIS_LIVE_KEY}${broadcastId}`));
        thisLiveData.viewerCount--;
        this.redisService.set(`${REDIS_LIVE_KEY}${broadcastId}`, JSON.stringify(thisLiveData));
      }
    });

    return interval(NOTIFY_LIVE_DATA_INTERVAL_TIME).pipe(
      map(async () => {
        const liveData: Broadcast = JSON.parse(await this.redisService.get(`${REDIS_LIVE_KEY}${broadcastId}`));
        return { data: liveData };
      }),
    );
  }

  filterWithCategory(liveList: Array<Broadcast>, condition) {
    return liveList.filter((live) => {
      return (
        live.contentCategory == (condition.content ?? 'unknown') || live.moodCategory == (condition.mood ?? 'unknown')
      );
    });
  }

  async filterWithFollow(memberId) {
    const live = (await this.getLiveList(0)).reduce((liveObj, thisLive) => {
      liveObj.set(thisLive.broadcastId, thisLive);
      return liveObj;
    }, new Map()) as Map<string, Broadcast>;
    const followList = await this.memberService.findMembersWithFollowTable(memberId);
    const onAir = [];
    const offAir = [];

    for (const member of followList) {
      if (live.has(member.broadcast_id)) {
        onAir.push(await this.responseLiveData(member.broadcast_id));
      } else {
        const { name, profile_image, broadcast_id, follower_count } = member;

        offAir.push({
          name,
          profile_image,
          broadcast_id,
          follower_count,
        } as User);
      }
    }

    return {
      onAir,
      offAir,
    };
  }
}
