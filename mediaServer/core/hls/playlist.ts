import fs from 'fs';

const EMPTY = '';
const LF = '\n';
const DOUBLE_LF = LF + LF;

function writeMediaPlaylist(mediaSquenceNumber, quality, sequence, filePath) {
  const header = generatePlaylistHeader(mediaSquenceNumber);
  const newMediaSequence = generatePlaylistSegment(quality, sequence);
  const newPreloadHint = generatePlaylistPreloadHint(quality, sequence);

  fs.readFile(filePath, 'utf-8', (err, buf) => {
    const data = buf == null ? [header, EMPTY].join(LF) : buf.toString();
    const beforeSegmentList = splitMediaSegment(data);
    const beforeSegments = splitBeforeSegments(beforeSegmentList).trim();
    const mediaPlaylist = [header, EMPTY, beforeSegments, newMediaSequence, newPreloadHint].join(LF);

    fs.writeFile(filePath, mediaPlaylist, () => {});
  });
}

function generatePlaylistHeader(mediaSquenceNumber) {
  return `#EXTM3U
#EXT-X-VERSION:10
#EXT-X-INDEPENDENT-SEGMENTS
#EXT-X-TARGETDURATION:10
#EXT-X-SERVER-CONTROL:CAN-BLOCK-RELOAD=YES,PART-HOLD-BACK=3.002000
#EXT-X-PART-INF:PART-TARGET=1.000000
#EXT-X-DISCONTINUITY-SEQUENCE:0
#EXT-X-MEDIA-SEQUENCE:${mediaSquenceNumber}
`.trim();
}

function generatePlaylistSegment(quality, sequence) {
  return `
#EXT-X-PART:DURATION=1.000000,URI="chunkList_${quality}p_part_${sequence * 2}.mp4",INDEPENDENT=YES
#EXT-X-PART:DURATION=1.000000,URI="chunkList_${quality}p_part_${sequence * 2 + 1}.mp4",INDEPENDENT=YES
#EXTINF:2.000000,
chunkList_${quality}p_${sequence}.mp4
`.trim();
}

function generatePlaylistPreloadHint(quality, sequence) {
  return `
#EXT-X-PART:DURATION=1.000000,URI="chunkList_${quality}p_part_${sequence * 2 + 2}.mp4",INDEPENDENT=YES
#EXT-X-PRELOAD-HINT:TYPE=PART,URI="chunkList_${quality}p_part_${sequence * 2 + 3}.mp4"
`.trim();
}

function splitMediaSegment(data) {
  const SEGMENT_REGEX = /^chunkList.*\.mp4/;
  const [, segments] = data.split(DOUBLE_LF);
  if (!segments) return [];

  const segmentList: string[] = [];
  segments.split(LF).reduce((acc, cur) => {
    if (cur.match(SEGMENT_REGEX)) {
      acc.push(cur);
      segmentList.push(acc.join(LF));
      return [];
    } else {
      acc.push(cur);
      return acc;
    }
  }, [] as string[]);

  return segmentList;
}

function splitBeforeSegments(beforeSegmentList) {
  if (beforeSegmentList.length < 3) {
    return beforeSegmentList.join(LF);
  }
  return beforeSegmentList.slice(1).join(LF);
}

export { writeMediaPlaylist };
