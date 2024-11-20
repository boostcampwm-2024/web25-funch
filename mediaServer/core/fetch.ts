const API_SERVER_LIVE_URL = 'https://api.funch.site/live';

async function startStreaming(streamKey) {
  return fetch(`${API_SERVER_LIVE_URL}/start`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Connection: 'close',
    },
    body: JSON.stringify({ streamKey }),
  });
}

function endStreaming(streamKey) {
  return fetch(`${API_SERVER_LIVE_URL}/end`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Connection: 'close',
    },
    body: JSON.stringify({ streamKey }),
  });
}

export { startStreaming, endStreaming };
