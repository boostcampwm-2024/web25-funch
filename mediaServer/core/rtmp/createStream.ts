import net from 'net';
import { writeType0Packet } from '@core/rtmp/packet';
import { encodeAmf0Cmd } from 'node-amfutils';

const getResultCommandMessage = (streamCount: number) => {
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
  const resultCommandMessage = getResultCommandMessage(streamCount);
  const responsePayload = encodeAmf0Cmd(resultCommandMessage);
  writeType0Packet(socket, 4, 20, responsePayload);
  return true;
}

export { createStream };
