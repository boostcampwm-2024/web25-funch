import net from 'net';
import crypto from 'crypto';
import { RtmpChunk, createRtmpChunk, parseBasicHeader, parseMessageHeader } from '@core/rtmp/packet';
import { handshake, HandshakeData } from '@core/rtmp/handshake';
import { connect } from '@core/rtmp/connect';
import { createStream } from '@core/rtmp/createStream';
import { publish } from '@core/rtmp/publish';
import { decodeAMF } from '@core/rtmp/utils';
import { createFlvHeader, previousTagSize0, createFlvTag } from './flv';
import fs from 'fs';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

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

  ffmpeg: ChildProcessWithoutNullStreams;
  storagePath = '../mediaStorage/zzawang'; // TODO: 스트림 키 검증 후 브로드캐스트 아이디 가져와서 Path에 등록

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

    this.ffmpeg = spawn('ffmpeg', [
      '-loglevel',
      'info',
      '-re',
      '-f',
      'flv',
      '-i',
      '-',

      // 1080p 출력 설정
      '-map',
      '0:v',
      '-map',
      '0:a',
      '-s:v:0',
      '1920x1080',
      '-c:v:0',
      'libx264',
      '-b:v:0',
      '5000k', // 비트레이트 설정
      '-c:a:0',
      'aac',
      '-b:a:0',
      '192k',
      '-hls_fmp4_init_filename',
      'chunkList_1080p_0_0.mp4',
      '-hls_time',
      '2',
      '-hls_list_size',
      '3',
      '-hls_segment_type',
      'fmp4',
      '-hls_flags',
      'delete_segments+split_by_time+independent_segments+omit_endlist',
      '-f',
      'hls',
      `${this.storagePath}/chunklist_1080p_.m3u8`,

      // 720p 출력 설정
      '-map',
      '0:v',
      '-map',
      '0:a',
      '-s:v:1',
      '1280x720',
      '-c:v:1',
      'libx264',
      '-b:v:1',
      '3000k',
      '-c:a:1',
      'aac',
      '-b:a:1',
      '128k',
      '-hls_fmp4_init_filename',
      'chunkList_720p_0_0.mp4',
      '-hls_time',
      '2',
      '-hls_list_size',
      '3',
      '-hls_segment_type',
      'fmp4',
      '-hls_flags',
      'delete_segments+split_by_time+independent_segments+omit_endlist',
      '-f',
      'hls',
      `${this.storagePath}/chunklist_720p_.m3u8`,

      // 480p 출력 설정
      '-map',
      '0:v',
      '-map',
      '0:a',
      '-s:v:2',
      '854x480',
      '-c:v:2',
      'libx264',
      '-b:v:2',
      '1500k',
      '-c:a:2',
      'aac',
      '-b:a:2',
      '96k',
      '-hls_fmp4_init_filename',
      'chunkList_480p_0_0.mp4',
      '-hls_time',
      '2',
      '-hls_list_size',
      '3',
      '-hls_segment_type',
      'fmp4',
      '-hls_flags',
      'delete_segments+split_by_time+independent_segments+omit_endlist',
      '-f',
      'hls',
      `${this.storagePath}/chunklist_480p_.m3u8`,
    ]);

    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }

    fs.watch(this.storagePath, () => {
      // if (filename === 'chunklist_1080p_50.ts' && this.maxCount === 1) {
      //   this.maxCount++;
      //   console.timeEnd('ts time check: ');
      // }
    });

    this.ffmpeg.stderr.on('data', (data) => {
      console.error(`FFmpeg stderr: ${data}`);
    });

    this.ffmpeg.on('close', (code) => {
      console.log(`FFmpeg process exited with code ${code}`);
    });

    this.ffmpeg.on('error', (code) => {
      console.log(`FFmpeg process error with code ${code}`);
    });

    this.ffmpeg.stdin.write(createFlvHeader());
    this.ffmpeg.stdin.write(previousTagSize0);
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
        console.log('parse error: ', e);
      }
    }
  }

  closeEvent() {
    console.log('Close Socket Event!');
    this.socket.end();
  }

  errorEvent(error) {
    console.log('Error Socket Event!');
    console.error(error);
    this.socket.destroy();
  }

  timeoutEvent() {
    console.log('Timeout Socket Event!');
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
        // TODO: 제어 메시지 처리
        this.handleControlMessage(typeId);
        break;
      case 17:
      case 20:
        this.handleCommandMessage(typeId);
        break;
      case 19:
      case 16:
        console.log('shared Object Message ', decodeAMF(typeId, this.workingChunk.payload, 19, 16));
        break;
      default:
        // TODO: 데이터 메시지 처리
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
        console.log('ABORT_MESSAGE');
        break;
      case ACK:
        console.log('ACK');
        break;
      case USER_CONTROL_MESSAGE:
        console.log('USER_CONTROL_MESSAGE');
        break;
      case WINDOW_ACK_SIZE:
        console.log('WINDOW_ACK_SIZE');
        break;
      case SET_PEER_BANDWIDTH:
        console.log('SET_PEER_BANDWIDTH');
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
        // TODO: DB 저장된 streamKey와 비교하여 등록된 스트림 key가 아니라면 error 이벤트 발생 함수
        this.streamCount++;
        createStream(this.socket, this.streamCount);
        break;
      case 'publish':
        publish(this.socket);
        break;
      default:
        break;
    }
  }

  handleDataMessage(typeId: number) {
    switch (typeId) {
      case AUDIO_MESSAGE:
      case VIDEO_MESSAGE:
        this.ffmpeg.stdin.write(createFlvTag(this.workingChunk));
        break;
    }
  }

  parseRtmpChunk(data: Buffer) {
    let offset = 0;
    let currentChunkState = 0;

    if (this.workingChunk.extraBytes > 0) {
      this.workingChunk.payload = Buffer.concat([
        this.workingChunk.payload,
        data.subarray(offset, this.workingChunk.extraBytes),
      ]);
      offset += this.workingChunk.extraBytes;
      this.workingChunk.extraBytes = 0;

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

          // 남은 data가 메시지 헤더 길이보다 부족하면
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
