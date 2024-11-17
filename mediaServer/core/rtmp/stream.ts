import net from 'net';
import crypto from 'crypto';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { RtmpChunk, createRtmpChunk, parseBasicHeader, parseMessageHeader } from '@rtmp/packet';
import { handshake, HandshakeData } from '@rtmp/handshake';
import { connect } from '@rtmp/connect';
import { createStream } from '@rtmp/createStream';
import { publish } from '@rtmp/publish';
import { decodeAMF } from '@rtmp/utils';
import { createFlvHeader, previousTagSize0, createFlvTag } from '@media/flv';
import { PassThrough } from 'stream';
import { initializeFFMepg, createMasterPlaylist } from '@media/ffmpeg';
import { logger } from '@/logger';

ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

const BASIC_HEADER_STATE = 0;
const MESSAGE_HEADER_STATE = 1;
const EXTENDED_TIMESTAMP_STATE = 2;
const PAYLOAD_STATE = 3;

const SET_CHUNK_SIZE = 1;
const ABORT_MESSAGE = 2;
const ACK = 3;
const USER_CONTROL_MESSAGE = 4;
const WINDOW_ACK_SIZE = 5;
const SET_PEER_BANDWIDTH = 6;

const AUDIO_MESSAGE = 8;
const VIDEO_MESSAGE = 9;

const COMMAND_AMF0 = 20;
const COMMAND_AMF3 = 17;

class RTMPStream {
  handshakeData: HandshakeData;
  isHandshakeDone: boolean;
  streamKey?: string;
  streamCount: number;
  chunkSize: number;
  chunkMap: Map<number, RtmpChunk>;
  workingChunk: RtmpChunk;

  ffmpeg: ffmpeg.FfmpegCommand;
  ffmpegInputStream: PassThrough;
  storagePath = '../../media-storage/zzawang'; // TODO: 스트림 키 검증 후 브로드캐스트 아이디 가져와서 Path에 등록
  timerObject: Record<string, NodeJS.Timeout>;

  constructor(private socket: net.Socket) {
    this.handshakeData = {
      C0: Buffer.alloc(0),
      C1: Buffer.alloc(0),
      C2: Buffer.alloc(0),
      C1_TIMESTAMP: Buffer.alloc(0),
      C1_RANDOM_BYTES: Buffer.alloc(0),
      S1_TIMESTAMP: Buffer.alloc(4),
      S1_RANDOM_BYTES: crypto.randomBytes(1528),
    };

    this.isHandshakeDone = false;
    this.streamCount = 0;
    this.chunkSize = 128;
    this.chunkMap = new Map();
    this.workingChunk = createRtmpChunk();

    this.timerObject = {};
    this.ffmpegInputStream = new PassThrough();

    // TODO: 방송을 최초 한 번은 시작한 다음에 실행
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
    createMasterPlaylist(this.storagePath);
    this.ffmpeg = initializeFFMepg(this.ffmpegInputStream, this.storagePath);
    this.ffmpegInputStream.write(createFlvHeader());
    this.ffmpegInputStream.write(previousTagSize0);
    this.ffmpeg.run();
  }

  run() {
    this.socket.on('data', this.dataEvent.bind(this));
    this.socket.on('close', this.closeEvent.bind(this));
    this.socket.on('error', this.errorEvent.bind(this));
    this.socket.on('timeout', this.timeoutEvent.bind(this));
  }

  dataEvent(data) {
    if (!this.isHandshakeDone) {
      this.isHandshakeDone = handshake(this.socket, data, this.handshakeData);
    } else {
      try {
        this.parseRtmpChunk(data);
      } catch (e) {
        logger.error(`parse error: ${e}`);
      }
    }
  }

  async closeEvent() {
    fs.rm(this.storagePath, { recursive: true, force: true }, () => {});
    logger.info(`The ${this.streamKey} has been closed.`);
    this.socket.end();
  }

  errorEvent(error) {
    logger.error(`The ${this.streamKey} has made an error: ${error}`);
    fs.rm(this.storagePath, { recursive: true, force: true }, () => {});
    this.socket.destroy();
  }

  timeoutEvent() {
    fs.rm(this.storagePath, { recursive: true, force: true }, () => {});
    logger.info(`The ${this.streamKey} timed out.`);
    this.socket.destroy();
  }

  handleMessage() {
    const typeId = this.workingChunk.messageHeader.typeId;
    switch (typeId) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        this.handleControlMessage(typeId);
        break;
      case 17:
      case 20:
        this.handleCommandMessage(typeId);
        break;
      case 19:
      case 16:
        logger.info(`shared Object Message : ${decodeAMF(typeId, this.workingChunk.payload, 19, 16)}`);
        break;
      default:
        this.handleDataMessage(typeId);
        break;
    }
  }

  handleControlMessage(typeId: number) {
    switch (typeId) {
      case SET_CHUNK_SIZE:
        this.chunkSize = this.workingChunk.payload.readUInt32BE();
        break;
      case ABORT_MESSAGE:
        logger.debug(`${this.streamKey} ABORT_MESSAGE`);
        break;
      case ACK:
        logger.debug(`${this.streamKey} ACK`);
        break;
      case USER_CONTROL_MESSAGE:
        logger.debug(`${this.streamKey} USER_CONTROL_MESSAGE`);
        break;
      case WINDOW_ACK_SIZE:
        logger.debug(`${this.streamKey} WINDOW_ACK_SIZE`);
        break;
      case SET_PEER_BANDWIDTH:
        logger.debug(`${this.streamKey} SET_PEER_BANDWIDTH`);
        break;
    }
  }

  handleCommandMessage(typeId: number) {
    const decodedPayload = decodeAMF(typeId, this.workingChunk.payload, COMMAND_AMF0, COMMAND_AMF3);
    switch (decodedPayload.cmd) {
      case 'connect':
        connect(this.socket);
        break;
      case 'releaseStream':
      case 'FCPublish':
        this.streamKey = decodedPayload.streamId;
        break;
      case 'createStream':
        // TODO: API서버에 Stream key 전달하고 broadcast key 가져오기, //API서버가 할 일 DB 저장된 streamKey와 비교하여 등록된 스트림 key가 아니라면 false 반환,
        this.streamCount++;
        createStream(this.socket, this.streamCount);
        break;
      case 'publish':
        publish(this.socket);
        logger.info(`${this.streamKey} successfully connected to the broadcast`);
        break;
      default:
        break;
    }
  }

  handleDataMessage(typeId: number) {
    switch (typeId) {
      case AUDIO_MESSAGE:
      case VIDEO_MESSAGE:
        this.ffmpegInputStream.write(createFlvTag(this.workingChunk));
        break;
    }
  }

  parseRtmpChunk(data: Buffer) {
    let offset = 0;
    let currentChunkState = 0;

    if (this.workingChunk.extraBytes > 0) {
      const leftData = data.subarray(offset, offset + this.workingChunk.extraBytes);
      this.workingChunk.payload = Buffer.concat([this.workingChunk.payload, leftData]);

      offset += leftData.length;
      this.workingChunk.extraBytes -= leftData.length;

      if (this.workingChunk.payload.length === this.workingChunk.messageHeader.messageLength) {
        this.handleMessage();
        this.workingChunk.payload = Buffer.alloc(0);
      }
    }

    if (this.workingChunk.headerBytes.length > 0) {
      data = Buffer.concat([this.workingChunk.headerBytes, data]);
      this.workingChunk.headerBytes = Buffer.alloc(0);
    }

    while (offset < data.length) {
      switch (currentChunkState % 4) {
        case BASIC_HEADER_STATE: {
          const basicHeaderBuf = data.subarray(offset, offset + 1)[0];
          const basicHeaderType = basicHeaderBuf & 0x3f;
          let basicHeaderBytes = 1;
          if (basicHeaderType === 0) {
            basicHeaderBytes = 2;
          } else if (basicHeaderType === 1) {
            basicHeaderBytes = 3;
          }
          const { chunkType, chunkStreamId } = parseBasicHeader(data.subarray(offset, offset + basicHeaderBytes));
          if (!this.chunkMap.has(chunkStreamId)) {
            this.workingChunk = createRtmpChunk(chunkType, chunkStreamId);
            this.chunkMap.set(chunkStreamId, this.workingChunk);
          } else {
            this.workingChunk = this.chunkMap.get(chunkStreamId)!;
            this.workingChunk.basicHeader.chunkType = chunkType;
          }

          this.workingChunk.headerBytes = Buffer.concat([
            this.workingChunk.headerBytes,
            data.subarray(offset, offset + basicHeaderBytes),
          ]);

          offset += basicHeaderBytes;
          currentChunkState += 1;
          break;
        }

        case MESSAGE_HEADER_STATE: {
          let messageHeaderBytes = 0;
          if (this.workingChunk.basicHeader.chunkType === 0) {
            messageHeaderBytes = 11;
          } else if (this.workingChunk.basicHeader.chunkType === 1) {
            messageHeaderBytes = 7;
          } else if (this.workingChunk.basicHeader.chunkType === 2) {
            messageHeaderBytes = 3;
          } else if (this.workingChunk.basicHeader.chunkType === 3) {
            currentChunkState += 1;
            break;
          }

          if (messageHeaderBytes > data.subarray(offset, offset + messageHeaderBytes).length) {
            this.workingChunk.headerBytes = Buffer.concat([this.workingChunk.headerBytes, data.subarray(offset)]);
            return;
          }

          this.workingChunk.messageHeader = parseMessageHeader(
            this.workingChunk.messageHeader,
            this.workingChunk.basicHeader.chunkType,
            data.subarray(offset, offset + messageHeaderBytes),
          );

          this.workingChunk.headerBytes = Buffer.concat([
            this.workingChunk.headerBytes,
            data.subarray(offset, offset + messageHeaderBytes),
          ]);

          offset += messageHeaderBytes;
          currentChunkState += 1;
          break;
        }

        case EXTENDED_TIMESTAMP_STATE: {
          const EXTENDED_TIMESTAMP_FLAG = this.workingChunk.messageHeader.timestamp === 0xffffff;
          if (EXTENDED_TIMESTAMP_FLAG) {
            if (data.length < offset + 4) {
              this.workingChunk.headerBytes = Buffer.concat([this.workingChunk.headerBytes, data.subarray(offset)]);
              return;
            }
            this.workingChunk.extendedTimestamp = data.subarray(offset, offset + 4).readUInt32BE();
            offset += 4;
          }

          currentChunkState += 1;
          this.workingChunk.headerBytes = Buffer.alloc(0);
          break;
        }

        case PAYLOAD_STATE: {
          const messageLength = this.workingChunk.messageHeader.messageLength;
          const availablePayloadLength = Math.min(messageLength - this.workingChunk.payload.length, this.chunkSize);
          const minimumValid = Math.min(availablePayloadLength, data.subarray(offset).length);

          if (
            this.workingChunk.messageHeader.messageLength - this.workingChunk.payload.length > this.chunkSize &&
            data.subarray(offset).length < this.chunkSize
          ) {
            this.workingChunk.extraBytes = this.chunkSize - minimumValid;
          } else if (minimumValid < this.chunkSize && availablePayloadLength > data.subarray(offset).length) {
            this.workingChunk.extraBytes = availablePayloadLength - data.subarray(offset).length;
          }

          this.workingChunk.payload = Buffer.concat([
            this.workingChunk.payload,
            data.subarray(offset, offset + minimumValid),
          ]);
          offset += minimumValid;

          currentChunkState += 1;
          if (this.workingChunk.payload.length === this.workingChunk.messageHeader.messageLength) {
            this.handleMessage();
            this.workingChunk.payload = Buffer.alloc(0);
          }
          break;
        }
      }
    }
  }
}

export default RTMPStream;
