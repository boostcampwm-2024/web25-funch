import net from 'net';
import crypto from 'crypto';
import { encodeAmf0Cmd, decodeAmf0Cmd } from 'node-amfutils';
import { handshake, HandshakeData } from '@core/rtmp/handshake';
import { separateRtmpChunk } from '@core/rtmp/packet';

class RTMPStream {
  handshakeData: HandshakeData;
  isHandshakeDone: boolean;
  isConnectDone: boolean;
  isCreateStreamDone: boolean;
  isPublishDone: boolean;

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
      //
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
}

export default RTMPStream;
