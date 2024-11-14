import net from 'net';
import { writeType0Packet } from '@rtmp/packet';
import { encodeAmf0Cmd } from 'node-amfutils';

const resultCommandMessage = {
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
  windowAckSizePayload.writeUIntBE(5000000, 0, 4);
  writeType0Packet(socket, 2, 5, windowAckSizePayload);

  const setPeerBandwidthPayload = Buffer.alloc(5);
  setPeerBandwidthPayload.writeUIntBE(5000000, 0, 4);
  setPeerBandwidthPayload.writeUIntBE(2, 4, 1);
  writeType0Packet(socket, 2, 6, setPeerBandwidthPayload);

  const setChunkSizePayload = Buffer.alloc(4);
  setChunkSizePayload.writeUIntBE(4096, 0, 4);
  writeType0Packet(socket, 2, 1, setChunkSizePayload);

  const responsePayload = encodeAmf0Cmd(resultCommandMessage);
  writeType0Packet(socket, 3, 20, responsePayload);
}

export { connect };
