import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Live } from '@live/entities/live.entity';
import { Broadcast, Playlist } from '@src/types';

@Injectable()
export class LiveService {
  live: Live;
  constructor() {
    this.live = Live.getInstance();
  }

  responsePlaylistUrl(broadcastId) {
    const createMultivariantPlaylistUrl = (id) =>
      `https://kr.object.ncloudstorage.com/media-storage/${id}/master_playlist.m3u8`;

    if (!this.live.data.has(broadcastId)) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const playlist: Playlist = { url: createMultivariantPlaylistUrl(broadcastId) };
    return playlist;
  }

  getCurrentLiveListRandomShuffle(count) {
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
}
