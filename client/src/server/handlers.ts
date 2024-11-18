import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/ping', () => {
    return HttpResponse.json('pong');
  }),
];
