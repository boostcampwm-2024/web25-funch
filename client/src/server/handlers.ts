import { mockedBroadcasts } from '@mocks/broadcasts';
import { mockedUsers } from '@mocks/users';
import { http, HttpResponse } from 'msw';

const getBroadcasts = () => {
  return HttpResponse.json(mockedBroadcasts);
};

const getUserByBroadcastId = ({ params }: { params: { broadcastId: string } }) => {
  const user = mockedUsers.find((user) => user.broadcastId === params.broadcastId);
  return HttpResponse.json(user);
};

export const handlers = [
  http.get('/api/broadcasts', getBroadcasts),
  http.get('/api/users/:broadcastId', getUserByBroadcastId),
];
