import net from 'net';

type RtmpChunkBasicHeader = {
  chunkType: number;
  chunkStreamId: number;
};

type RtmpChunkMessageHeader = {
  timestamp: number;
  timestampDelta: number;
  messageLength: number;
  typeId: number;
  messageStreamId: number;
};

interface RtmpChunk {
  basicHeader: RtmpChunkBasicHeader;
  messageHeader: RtmpChunkMessageHeader;
  extendedTimestamp: number;
  payload: Buffer;
  extraBytes: number;
}

function createRtmpChunk(chunkType = 0, chunkStreamId = 0): RtmpChunk {
  return {
    basicHeader: {
      chunkType,
      chunkStreamId,
    },
    messageHeader: {
      timestamp: 0,
      timestampDelta: 0,
      messageLength: 0,
      typeId: 0,
      messageStreamId: 0,
    },
    extendedTimestamp: 0,
    payload: Buffer.alloc(0),
    extraBytes: 0,
  };
}

function parseBasicHeader(data: Buffer): RtmpChunkBasicHeader {
  const defaultBasicHeader = data.subarray(0, 1);
  const chunkType = defaultBasicHeader[0] >> 6;
  let chunkStreamId = defaultBasicHeader[0] & 0b00111111;

  switch (chunkStreamId) {
    case 0:
      chunkStreamId = data.subarray(1, 2)[0] + 64;
      break;
    case 1: {
      const basicHeaderBytes1 = data.subarray(1, 2)[0];
      const basicHeaderBytes2 = data.subarray(2, 3)[0];
      chunkStreamId = basicHeaderBytes2 * 256 + basicHeaderBytes1 + 64;
      break;
    }
    default:
      break;
  }
  return { chunkType, chunkStreamId };
}

function parseMessageHeader(
  workingChunkMessageHeader: RtmpChunkMessageHeader,
  chunkType: number,
  data: Buffer,
): RtmpChunkMessageHeader {
  let { timestamp, timestampDelta, messageLength, typeId, messageStreamId } = workingChunkMessageHeader;

  if (chunkType <= 2) {
    timestampDelta = data.readUIntBE(0, 3);
    timestamp += timestampDelta;
    if (timestamp >= 0xffffff) timestamp = 0xffffff;
  }
  if (chunkType <= 1) {
    messageLength = data.readUIntBE(3, 3);
    typeId = data.readUIntBE(6, 1);
  }
  if (chunkType <= 0) {
    messageStreamId = data.subarray(7).readUInt32LE();
    timestamp = data.readUIntBE(0, 3);
    timestampDelta = 0;
  }

  return { timestamp, timestampDelta, messageLength, typeId, messageStreamId };
}

function writeType0Packet(socket: net.Socket, streamId: number, messageTypeId: number, payload: Buffer) {
  const basicHeader = Buffer.alloc(1);
  basicHeader.writeUIntBE(streamId, 0, 1);
  const messageHeader = Buffer.alloc(11);
  messageHeader.writeUIntBE(payload.length, 3, 3); // message length 설정
  messageHeader.writeUIntBE(messageTypeId, 6, 1); // message type id 설정

  socket.write(Buffer.concat([basicHeader, messageHeader, payload]));
}

export { createRtmpChunk, parseBasicHeader, parseMessageHeader, writeType0Packet, RtmpChunk };
