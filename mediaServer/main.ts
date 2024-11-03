import net from 'net';
import crypto from 'crypto';

const isC0 = (data: Buffer) => data.length === 1;
const isC1 = (C0: Buffer, C1: Buffer) => C0.length === 1 && C1.length === 0;
const isC0C1 = (data: Buffer) => data.length == 1537;
const isC2 = (C1: Buffer, C2: Buffer) => C1.length === 1536 && C2.length === 0;
const isBufferSize1536 = (data: Buffer) => data.length === 1536;
const isValidC2RandomEcho = (S1_RANDOM_ECHO: Buffer, C2_RANDOM_ECHO: Buffer) => S1_RANDOM_ECHO.equals(C2_RANDOM_ECHO);

const server = net.createServer((socket) => {
  let C0 = Buffer.alloc(0);
  let C1 = Buffer.alloc(0);
  let C2 = Buffer.alloc(0);

  let C1_TIMESTAMP = Buffer.alloc(0);
  let C1_RANDOM_BYTES = Buffer.alloc(0);
  let S1_TIMESTAMP = Buffer.alloc(4);
  let S1_RANDOM_BYTES = Buffer.alloc(0);

  socket.on('data', (data) => {
    // RTMP Handshake Packet 할당
    if (isC0(data)) {
      C0 = data;
    } else if (isC0C1(data)) {
      C0 = data.subarray(0, 1);
      C1 = data.subarray(1);
    } else if (isBufferSize1536(data)) {
      if (isC1(C0, C1)) {
        C1 = data;
      } else if (isC2(C1, C2)) {
        C2 = data;
      }
    }

    // C1 Packet 분리 할당
    if (isBufferSize1536(C1) || isC0C1(data)) {
      C1_TIMESTAMP = C1.subarray(0, 4);
      C1_RANDOM_BYTES = C1.subarray(8);
    }

    // RTMP Handshake Packet 전송
    if (isC0(data) || isC0C1(data)) {
      const S0 = Buffer.alloc(1);
      S0.writeUIntLE(3, 0, 1);
      socket.write(S0);

      const S1_0 = Buffer.alloc(4);
      S1_TIMESTAMP.writeUIntLE(0, 0, 4);
      S1_RANDOM_BYTES = crypto.randomBytes(1528);
      const S1 = Buffer.concat([S1_TIMESTAMP, S1_0, S1_RANDOM_BYTES]);
      socket.write(S1);
    } else if (isBufferSize1536(C2)) {
      const C2_RANDOM_ECHO = C2.subarray(8);
      if (!isValidC2RandomEcho(S1_RANDOM_BYTES, C2_RANDOM_ECHO)) return;

      const S2 = Buffer.concat([C1_TIMESTAMP, S1_TIMESTAMP, C1_RANDOM_BYTES]);
      socket.write(S2);
    }
  });

  socket.on('error', (_) => socket.end());
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
