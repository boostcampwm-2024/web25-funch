import { mockedBroadcasts } from '@mocks/broadcasts';
import { mockedPlaylists } from '@mocks/playlists';
import { mockedUsers } from '@mocks/users';
import { mockedUpdates } from '@mocks/updates';
import { http, HttpResponse } from 'msw';
import { mockedMydata } from '@mocks/mydata';

const getLiveList = () => {
  return HttpResponse.json(mockedBroadcasts);
};

const getPlaylist = ({ params }: { params: { broadcastId: string } }) => {
  const playlist = mockedPlaylists.find((playlist) => playlist.broadcastData.broadcastId === params.broadcastId);
  if (!playlist) {
    return HttpResponse.json(null, {
      status: 404,
    });
  }

  return HttpResponse.json(playlist);
};

const login = () => {
  const user = mockedUsers[0];
  return HttpResponse.json(user);
};

const update = () => {
  const updated = mockedUpdates[0];
  return HttpResponse.json(updated);
};

const getUserByBroadcastId = ({ params }: { params: { broadcastId: string } }) => {
  const user = mockedUsers.find((user) => user.broadcastId === params.broadcastId);
  return HttpResponse.json(user);
};

const getSuggestedLiveList = () => {
  return HttpResponse.json({
    suggest: mockedBroadcasts,
  });
};

const authenticate = () => {
  return HttpResponse.json({
    accessToken: 'funch-access-access',
    name: mockedUsers[0].name,
    profile_image: mockedUsers[0].profileImageUrl,
    broadcast_id: mockedUsers[0].broadcastId,
  });
};

const getMydata = () => {
  return HttpResponse.json(mockedMydata);
};

export const handlers = [
  http.get('/api/live/list', getLiveList),
  http.get('/api/live/:broadcastId', getPlaylist),
  http.get('/api/users/:broadcastId', getUserByBroadcastId),
  http.get('/api/live/list/suggest', getSuggestedLiveList),
  http.get('/api/members/mydata', getMydata),
  http.post('/api/auth/github/callback', authenticate),
  http.post('/api/login', login),
  http.patch('/api/live/update', update),
];
