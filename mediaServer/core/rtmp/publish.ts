import net from 'net';
import { writeType0Packet } from '@core/rtmp/packet';
import { encodeAmf0Cmd } from 'node-amfutils';

const RESULT_COMMAND_MESSAGE = {
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
  streamBeginPayload.writeIntBE(0, 0, 2);
  writeType0Packet(socket, 2, 4, streamBeginPayload);

  const responsePayload = encodeAmf0Cmd(RESULT_COMMAND_MESSAGE);
  writeType0Packet(socket, 4, 20, responsePayload);
  return true;
}

export { publish };
