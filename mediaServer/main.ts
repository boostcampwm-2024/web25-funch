import net from 'net';
import crypto from 'crypto';
import { handshake, HandshakeData } from '@core/rtmp/handshake';

const server = net.createServer((socket) => {
  const handshakeData: HandshakeData = {
    C0: Buffer.alloc(0),
    C1: Buffer.alloc(0),
    C2: Buffer.alloc(0),
    C1_TIMESTAMP: Buffer.alloc(0),
    C1_RANDOM_BYTES: Buffer.alloc(0),
    S1_TIMESTAMP: Buffer.alloc(4),
    S1_RANDOM_BYTES: crypto.randomBytes(1528),
  };

  socket.on('data', (data) => {
    handshake(socket, data, handshakeData);
  });

  socket.on('error', (_) => socket.end());
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
