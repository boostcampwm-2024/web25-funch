import net from 'net';
import crypto from 'crypto';
import { separateRtmpChunk, RtmpChunck } from '@core/rtmp/packet';
import { handshake, HandshakeData } from '@core/rtmp/handshake';
import { connect } from '@core/rtmp/connect';
import { decodeAMF } from '@core/rtmp/utils';

class RTMPStream {
  handshakeData: HandshakeData;
  isHandshakeDone: boolean;
  isConnectDone: boolean;
  isCreateStreamDone: boolean;
  isPublishDone: boolean;
  streamKey?: string;

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
    this.isConnectDone = false;
    this.isCreateStreamDone = false;
    this.isPublishDone = false;
  }

  run() {
    this.socket.on('data', this.dataEvent.bind(this));
    this.socket.on('close', this.closeEvent.bind(this));
    this.socket.on('error', this.errorEvent.bind(this));
    this.socket.on('timeout', this.timeoutEvent.bind(this));
  }

  dataEvent(data) {
    console.log(data.length);
    if (!this.isHandshakeDone) {
      this.isHandshakeDone = handshake(this.socket, data, this.handshakeData);
    } else if (!this.isConnectDone) {
      const chunks = separateRtmpChunk(data);
      chunks.forEach((chunk) => {
        const typeId = chunk.messageHeader.typeId;
        this.handleMessage(typeId, chunk);
      });
    } else if (!this.isCreateStreamDone) {
      //
    } else if (!this.isPublishDone) {
      //
    } else {
      //
    }
  }

  closeEvent() {
    this.socket.destroy();
  }

  errorEvent(error) {
    this.socket.destroy();
  }

  timeoutEvent() {
    this.socket.destroy();
  }

  handleMessage(typeId: number, chunk: RtmpChunck) {
    switch (typeId) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        // TODO: 제어 메시지 처리
        this.handleControlMessage(typeId, chunk);
        break;
      case 17:
      case 20:
        this.handleCommandMessage(typeId, chunk);
        break;
      default:
        // TODO: 데이터 메시지 처리
        break;
    }
  }

  handleControlMessage(typeId: number, chunk: RtmpChunck) {}

  handleCommandMessage(typeId: number, chunk: RtmpChunck) {
    const AMF0 = 20;
    const AMF3 = 17;
    const encodedPayload = decodeAMF(typeId, chunk.payload, AMF0, AMF3);

    switch (encodedPayload.cmd) {
      case 'connect':
        this.isConnectDone = connect(this.socket);
        break;
      case 'FCPublish':
        this.streamKey = encodedPayload.streamId;
        break;
      case 'createStream':
        break;
      case 'publish':
        break;
      default:
        break;
    }
  }

  handleDataMessage(typeId: number, chunk: RtmpChunck) {}
}

export default RTMPStream;
