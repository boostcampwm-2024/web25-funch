import { logger } from '@/logger';

type StreamingEvent = 'start' | 'end';
const API_SERVER_LIVE_URL = 'https://api.funch.site/live';

async function streamingEvent(event: StreamingEvent, data) {
  try {
    return fetch(`${API_SERVER_LIVE_URL}/${event}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    logger.error(`fetch start stream event: ${e}`);
    return;
  }
}

export { streamingEvent };
