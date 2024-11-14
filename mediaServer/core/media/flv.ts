const AUDIO_MESSAGE = 8;
const VIDEO_MESSAGE = 9;

function createFlvHeader() {
  const signature = Buffer.from([0x46, 0x4c, 0x56]);
  const version = Buffer.from([0x01]);
  const dataType = Buffer.from([0x05]); // Data Type: 비디오 1, 오디오 4, 합 5
  const flvHeaderOffset = Buffer.from([0x00, 0x00, 0x00, 0x09]);

  return Buffer.concat([signature, version, dataType, flvHeaderOffset]);
}

const previousTagSize0 = Buffer.from([0x00, 0x00, 0x00, 0x00]);

function createFlvTagHeader(rtmpMessage) {
  let tagType;
  if (rtmpMessage.messageHeader.typeId === VIDEO_MESSAGE) {
    tagType = 0x09;
  } else if (rtmpMessage.messageHeader.typeId === AUDIO_MESSAGE) {
    tagType = 0x08;
  } else return null; // 다른 타입 처리 x

  const flvTagHeader = Buffer.alloc(11);
  flvTagHeader[0] = tagType;
  flvTagHeader.writeUIntBE(rtmpMessage.payload.length, 1, 3);
  flvTagHeader.writeUIntBE(rtmpMessage.messageHeader.timestamp & 0xffffff, 4, 3);
  flvTagHeader[7] = (rtmpMessage.extendedTimestamp >> 24) & 0xff;
  // StreamID
  flvTagHeader.writeUIntBE(0, 8, 3);

  return flvTagHeader;
}

function createFlvTag(rtmpMessage) {
  const flvTagHeader = createFlvTagHeader(rtmpMessage);
  const previousTagSize = Buffer.alloc(4);
  previousTagSize.writeUint32BE(flvTagHeader!.length + rtmpMessage.payload.length);

  return Buffer.concat([flvTagHeader!, rtmpMessage.payload, previousTagSize]);
}

export { createFlvHeader, previousTagSize0, createFlvTag };
