import net from 'net';
import { writeType0Packet } from '@core/rtmp/packet';
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

function connect(socket: net.Socket) {
  const windowAckSizePayload = Buffer.alloc(4);
  windowAckSizePayload.writeIntBE(5000000, 0, 4);
  writeType0Packet(socket, 2, 5, windowAckSizePayload);

  const setPeerBandwidthPayload = Buffer.alloc(5);
  setPeerBandwidthPayload.writeIntBE(5000000, 0, 4);
  setPeerBandwidthPayload.writeIntBE(2, 4, 1);
  writeType0Packet(socket, 2, 6, setPeerBandwidthPayload);

  const setChunkSizePayload = Buffer.alloc(4);
  setChunkSizePayload.writeIntBE(4096, 0, 4);
  writeType0Packet(socket, 2, 1, setChunkSizePayload);

  const responsePayload = encodeAmf0Cmd(RESULT_COMMAND_MESSAGE);
  writeType0Packet(socket, 3, 20, responsePayload);

  return true;
}

export { connect };
