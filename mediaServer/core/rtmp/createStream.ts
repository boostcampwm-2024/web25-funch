import net from 'net';
import { writeType0Packet } from '@core/rtmp/packet';
import { encodeAmf0Cmd } from 'node-amfutils';

const RESULT_COMMAND_MESSAGE = (streamCount: number) => {
  return {
    cmd: '_result',
    transId: 4,
    cmdObj: null,
    info: {
      streamCount,
    },
  };
};

function createStream(socket: net.Socket, streamCount: number) {
  const responsePayload = encodeAmf0Cmd(RESULT_COMMAND_MESSAGE(streamCount));
  writeType0Packet(socket, 4, 20, responsePayload);
  return true;
}

export { createStream };
