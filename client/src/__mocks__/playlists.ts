import type { Playlist } from '@libs/internalTypes';
import { mockedBroadcasts } from './broadcasts';

const demoPlaylistUrl =
  'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8';

export const mockedPlaylists: Playlist[] = mockedBroadcasts.map((broadcast) => ({
  playlistUrl: demoPlaylistUrl,
  broadcastData: {
    ...broadcast,
  },
}));
