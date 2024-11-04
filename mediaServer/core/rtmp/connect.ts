import net from 'net';
import { encodeAmf0Cmd } from 'node-amfutils';

const RESULT_COMMAND_MESSAGE = {
  cmd: '_result',
  transId: 1,
  cmdObj: {
    fmsVer: 'FMS/3,0,1,123',
    capabilities: 31,
  },
  info: {
    level: 'status',
    code: 'NetConnection.Connect.Success',
    description: 'Connection succeeded.',
    objectEncoding: 0,
  },
};

function writePacket(socket: net.Socket, streamId: number, messageTypeId: number, payload: Buffer) {
  const basicHeader = Buffer.alloc(1);
  basicHeader.writeIntLE(streamId, 0, 1);
  const messageHeader = Buffer.alloc(11);
  messageHeader.writeIntBE(payload.length, 3, 3); // message length 설정
  messageHeader.writeIntBE(messageTypeId, 6, 1); // message type id 설정

  socket.write(Buffer.concat([basicHeader, messageHeader, payload]));
}

function connect(socket: net.Socket) {
  const windowAckSizePayload = Buffer.alloc(4);
  windowAckSizePayload.writeIntBE(5000000, 0, 4);
  writePacket(socket, 2, 5, windowAckSizePayload);

  const setPeerBandwidthPayload = Buffer.alloc(5);
  setPeerBandwidthPayload.writeIntBE(5000000, 0, 4);
  setPeerBandwidthPayload.writeIntBE(2, 4, 1);
  writePacket(socket, 2, 6, setPeerBandwidthPayload);

  const setChunkSizePayload = Buffer.alloc(4);
  setChunkSizePayload.writeIntBE(4096, 0, 4);
  writePacket(socket, 2, 1, setChunkSizePayload);

  const responsePayload = encodeAmf0Cmd(RESULT_COMMAND_MESSAGE);
  writePacket(socket, 3, 20, responsePayload);

  return true;
}

export { connect };
