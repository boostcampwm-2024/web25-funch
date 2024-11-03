import net from 'net';

const isC0 = (data: Buffer) => data.length === 1;
const isC1 = (C0: Buffer, C1: Buffer) => C0.length === 1 && C1.length === 0;
const isC0C1 = (data: Buffer) => data.length == 1537;
const isC2 = (C1: Buffer, C2: Buffer) => C1.length === 1536 && C2.length === 0;
const isBufferSize1536 = (data: Buffer) => data.length === 1536;
const isValidC2RandomEcho = (S1_RANDOM_ECHO: Buffer, C2_RANDOM_ECHO: Buffer) => S1_RANDOM_ECHO.equals(C2_RANDOM_ECHO);

type HandshakeData = {
  [key: string]: Buffer;
};

function handshake(socket: net.Socket, data: Buffer, state: HandshakeData) {
  // RTMP Handshake Packet 할당
  if (isC0(data)) {
    state.C0 = data;
  } else if (isC0C1(data)) {
    state.C0 = data.subarray(0, 1);
    state.C1 = data.subarray(1);
  } else if (isBufferSize1536(data)) {
    if (isC1(state.C0, state.C1)) {
      state.C1 = data;
    } else if (isC2(state.C1, state.C2)) {
      state.C2 = data;
    }
  }

  // C1 Packet 분리 할당
  const IS_C1_ALREADY_ARRIVED = isC2(state.C1, state.C2);
  if ((isBufferSize1536(state.C1) || isC0C1(data)) && IS_C1_ALREADY_ARRIVED) {
    state.C1_TIMESTAMP = state.C1.subarray(0, 4);
    state.C1_RANDOM_BYTES = state.C1.subarray(8);
  }

  // RTMP Handshake Packet 전송
  if (isC0(data) || isC0C1(data)) {
    const S0 = Buffer.alloc(1);
    S0.writeUIntLE(3, 0, 1);
    socket.write(S0);

    const S1_0 = Buffer.alloc(4);
    const S1 = Buffer.concat([state.S1_TIMESTAMP, S1_0, state.S1_RANDOM_BYTES]);
    socket.write(S1);
  } else if (isBufferSize1536(state.C2)) {
    const C2_RANDOM_ECHO = state.C2.subarray(8);
    if (!isValidC2RandomEcho(state.S1_RANDOM_BYTES, C2_RANDOM_ECHO)) return false;

    const S2 = Buffer.concat([state.C1_TIMESTAMP, state.S1_TIMESTAMP, state.C1_RANDOM_BYTES]);
    socket.write(S2);
    return true;
  }

  return false;
}

export { HandshakeData, handshake };
