import net from 'net';
import { writeType0Packet } from '@rtmp/packet';
import { encodeAmf0Cmd } from 'node-amfutils';

const resultCommandMessage = {
  cmd: 'onStatus',
  transId: 0,
  cmdObj: null,
  info: {
    level: 'status',
    code: 'NetStream.Publish.Start',
    description: 'Publish succeeded.',
    objectEncoding: 0,
  },
};

function publish(socket: net.Socket) {
  const streamBeginPayload = Buffer.alloc(2);
  streamBeginPayload.writeUIntBE(0, 0, 2);
  writeType0Packet(socket, 2, 4, streamBeginPayload);

  const responsePayload = encodeAmf0Cmd(resultCommandMessage);
  writeType0Packet(socket, 4, 20, responsePayload);
}

export { publish };
