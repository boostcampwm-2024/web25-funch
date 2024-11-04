import net from 'net';
import RTMPStream from '@core/rtmp/stream';

const server = net.createServer((socket) => {
  const rtmpStream = new RTMPStream(socket);
  rtmpStream.run();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
