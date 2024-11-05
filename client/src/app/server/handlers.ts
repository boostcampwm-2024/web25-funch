import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/ping', () => {
    return HttpResponse.json('pong');
  }),
  http.get('/api/babo', () => {
    return HttpResponse.json('babo');
  }),
];
