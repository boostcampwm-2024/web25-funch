import net from 'net';
import RTMPStream from '@rtmp/stream';

const server = net.createServer((socket) => {
  const rtmpStream = new RTMPStream(socket);
  rtmpStream.run();
});

const PORT = Number(process.env.PORT) || 1935;

server.listen(PORT, () => {
  console.log(`Media server running on port ${PORT}`);
});
