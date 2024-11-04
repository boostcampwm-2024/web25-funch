import net from 'net';

type RtmpChunckBasicHeader = {
  chunkType: number;
  chunkStreamId: number;
};

type RtmpChunckMessageHeader = {
  timestamp: number;
  messageLength: number;
  typeId: number;
  messageStreamId: number;
};

interface RtmpChunck {
  basicHeader: RtmpChunckBasicHeader;
  messageHeader: RtmpChunckMessageHeader;
  extendedTimestamp: number;
  payload: Buffer;
}

function createRtmpChunk(): RtmpChunck {
  return {
    basicHeader: {
      chunkType: 0,
      chunkStreamId: 0,
    },
    messageHeader: {
      timestamp: 0,
      messageLength: 0,
      typeId: 0,
      messageStreamId: 0,
    },
    extendedTimestamp: 0,
    payload: Buffer.alloc(0),
  };
}

function parseBasicHeader(data: Buffer): RtmpChunckBasicHeader {
  let defaultBasicHeader = data.subarray(0, 1);
  let chunkType = defaultBasicHeader[0] >> 6;
  let chunkStreamId = defaultBasicHeader[0] & 0b00111111;

  switch (chunkStreamId) {
    case 0:
      chunkStreamId = data.subarray(1, 2)[0] + 64;
      break;
    case 1:
      const basicHeaderBytes1 = data.subarray(1, 2)[0];
      const basicHeaderBytes2 = data.subarray(2, 3)[0];
      chunkStreamId = basicHeaderBytes2 * 256 + basicHeaderBytes1 + 64;
      break;
    default:
      break;
  }
  return { chunkType, chunkStreamId };
}

function parseMessageHeader(chunkType: number, data: Buffer): RtmpChunckMessageHeader {
  let timestamp, messageLength, typeId, messageStreamId;

  if (chunkType <= 2) {
    timestamp = data.readIntBE(0, 3);
  }
  if (chunkType <= 1) {
    messageLength = data.readIntBE(3, 3);
    typeId = data.readIntBE(6, 1);
  }
  if (chunkType <= 0) {
    messageStreamId = data.subarray(7).readInt32BE();
  }

  return { timestamp, messageLength, typeId, messageStreamId };
}

function separateRtmpChunk(data: Buffer): RtmpChunck[] {
  const rtmpChunks: RtmpChunck[] = [];
  const BASIC_HEADER_STATE = 0;
  const MESSAGE_HEADER_STATE = 1;
  const EXTENDED_TIMESTAMP_STATE = 2;
  const PAYLOAD_STATE = 3;

  let offset = 0;
  let currentChunkState = 0;
  let chunk: RtmpChunck = createRtmpChunk();

  while (offset < data.length) {
    switch (currentChunkState % 4) {
      case BASIC_HEADER_STATE:
        let basicHeaderBytes = 1;
        chunk = createRtmpChunk();
        const basicHeaderBuf = data.subarray(offset, offset + 1)[0];
        const chunkStreamId = basicHeaderBuf & 0x3f;
        if (chunkStreamId === 0) {
          basicHeaderBytes = 2;
        } else if (chunkStreamId === 1) {
          basicHeaderBytes = 3;
        }
        chunk.basicHeader = parseBasicHeader(data.subarray(offset, offset + basicHeaderBytes));
        offset += basicHeaderBytes;
        currentChunkState += 1;
        break;
      case MESSAGE_HEADER_STATE:
        let messageHeaderBytes = 0;
        if (chunk.basicHeader.chunkType === 0) {
          messageHeaderBytes = 11;
        } else if (chunk.basicHeader.chunkType === 1) {
          messageHeaderBytes = 7;
        } else if (chunk.basicHeader.chunkType === 2) {
          messageHeaderBytes = 3;
        } else if (chunk.basicHeader.chunkType === 3) {
          continue;
        }
        chunk.messageHeader = parseMessageHeader(
          chunk.basicHeader.chunkType,
          data.subarray(offset, offset + messageHeaderBytes),
        );
        offset += messageHeaderBytes;
        currentChunkState += 1;
        break;
      case EXTENDED_TIMESTAMP_STATE:
        const EXTENDED_TIMESTAMP_FLAG = chunk.messageHeader.timestamp === 16777215;
        if (EXTENDED_TIMESTAMP_FLAG) {
          chunk.messageHeader.timestamp = data.subarray(offset, offset + 4)[0];
          offset += 4;
        }
        currentChunkState += 1;
        break;
      case PAYLOAD_STATE:
        const messageLength = chunk.messageHeader.messageLength;
        chunk.payload = data.subarray(offset, offset + messageLength);
        offset += messageLength;
        currentChunkState += 1;
        rtmpChunks.push(chunk);
        break;
    }
  }
  return rtmpChunks;
}

function writeType0Packet(socket: net.Socket, streamId: number, messageTypeId: number, payload: Buffer) {
  const basicHeader = Buffer.alloc(1);
  basicHeader.writeIntLE(streamId, 0, 1);
  const messageHeader = Buffer.alloc(11);
  messageHeader.writeIntBE(payload.length, 3, 3); // message length 설정
  messageHeader.writeIntBE(messageTypeId, 6, 1); // message type id 설정

  socket.write(Buffer.concat([basicHeader, messageHeader, payload]));
}

export { separateRtmpChunk, writeType0Packet, RtmpChunck };
