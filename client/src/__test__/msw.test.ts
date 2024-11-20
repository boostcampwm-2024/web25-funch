import { mockedBroadcasts } from '@mocks/broadcasts';
import { mockedUsers } from '@mocks/users';
import { describe, expect, test } from 'vitest';

describe('msw handlers', () => {
  test('should return mocked broadcasts', async () => {
    const response = await fetch('/api/live/list');
    const data = await response.json();
    expect(data).toStrictEqual(mockedBroadcasts);
  });
  test('should return user by broadcastId', async () => {
    const mockedUser = mockedUsers[0];
    const response = await fetch(`/api/users/${mockedUser.broadcastId}`);
    const data = await response.json();
    expect(data).toStrictEqual(mockedUser);
  });
  test('should return mocked playlist by broadcastId', async () => {
    const mockedBroadcast = mockedBroadcasts[0];
    const response = await fetch(`/api/live/${mockedBroadcast.broadcastId}`);
    const data = await response.json();
    expect(data.broadCastData).toStrictEqual(mockedBroadcast);
  });
  test('should return 404 when playlist not found', async () => {
    const response = await fetch('/api/live/invalid-broadcast-id');
    expect(response.status).toBe(404);
  });
  test('should return suggested live list', async () => {
    const response = await fetch('/api/live/list/suggest');
    const data = await response.json();
    expect(data.suggest).toStrictEqual(mockedBroadcasts);
  });
  test('should login and get user information', async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    expect(data).toStrictEqual(mockedUsers[0]);
  });
});
