import { getLiveList, getPlaylist, getSuggestedLiveList } from '@libs/actions';
import { mockedBroadcasts } from '@mocks/broadcasts';
import { describe, expect, test } from 'vitest';

describe('actions', () => {
  test('should return mocked broadcasts', async () => {
    const result = await getLiveList();
    expect(result).not.toBeNull();
    expect(result).toStrictEqual(mockedBroadcasts);
  });
  test('should return mocked playlist by broadcastId', async () => {
    const mockedBroadcast = mockedBroadcasts[0];
    const result = await getPlaylist(mockedBroadcast.broadcastId);
    expect(result).not.toBeNull();
    expect(result!.broadCastData).toStrictEqual(mockedBroadcast);
  });
  test('should throw error when playlist not found', async () => {
    const invalidBroadcastId = 'invalid-broadcast-id';
    const fetcher = () => getPlaylist(invalidBroadcastId);
    await expect(fetcher).rejects.toThrowError();
  });
  test('should return suggested live list', async () => {
    let mostViewerCount = -Infinity;

    mockedBroadcasts.forEach((broadcast) => {
      if (broadcast.viewerCount > mostViewerCount) {
        mostViewerCount = broadcast.viewerCount;
      }
    });

    const suggestedList = await getSuggestedLiveList();

    expect(suggestedList).toHaveLength(10);

    expect(suggestedList[0].viewerCount).toBe(mostViewerCount);
  });
});
