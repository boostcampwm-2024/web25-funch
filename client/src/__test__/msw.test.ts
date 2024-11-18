import { mockedBroadcasts } from '@mocks/broadcasts';
import { mockedUsers } from '@mocks/users';
import { describe, expect, test } from 'vitest';

describe('msw handlers', () => {
  test('should return pong', async () => {
    const response = await fetch('/api/ping');
    const data = await response.json();
    expect(data).toBe('pong');
  });
  test('should return mocked broadcasts', async () => {
    const response = await fetch('/api/broadcasts');
    const data = await response.json();
    expect(data).toStrictEqual(mockedBroadcasts);
  });
  test('should return user by broadcastId', async () => {
    const mockedUser = mockedUsers[0];
    const response = await fetch(`/api/users/${mockedUser.broadcastId}`);
    const data = await response.json();
    expect(data).toStrictEqual(mockedUser);
  });
});
