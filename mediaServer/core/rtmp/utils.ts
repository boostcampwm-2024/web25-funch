import { decodeAmf0Cmd, decodeAmf3Cmd } from 'node-amfutils';

function decodeAMF(typeId: number, paylod: Buffer, amf0Num: number, amf3Num: number) {
  try {
    if (typeId === amf0Num) {
      return decodeAmf0Cmd(paylod);
    } else if (typeId === amf3Num) {
      return decodeAmf3Cmd(paylod);
    }
  } catch (e) {
    console.log(typeId, JSON.stringify(paylod), e);
  }
}

export { decodeAMF };
