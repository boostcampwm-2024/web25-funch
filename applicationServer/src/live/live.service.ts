import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { Live } from '@live/entities/live.entity';
import { Playlist } from '@src/types'

@Injectable()
export class LiveService {
  live: Live
  constructor() {
    this.live = Live.getInstance();
  }

  responsePlaylistUrl(broadcastId) {
    const createMultivariantPlaylistUrl = (id) =>  `https://kr.object.ncloudstorage.com/media-storage/${id}/master_playlist.m3u8`;
    
    if(this.live.data.has(broadcastId)) {
      const playlist: Playlist = { url: createMultivariantPlaylistUrl(broadcastId) }
      return playlist;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
