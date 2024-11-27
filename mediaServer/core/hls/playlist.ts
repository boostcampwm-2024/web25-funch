import fs from 'fs';

const EMPTY = '';
const LF = '\n';
const DOUBLE_LF = LF + LF;

function writeMediaPlaylist(mediaSquenceNumber, quality, sequence, filePath, startDate) {
  const header = generatePlaylistHeader(mediaSquenceNumber, startDate);
  const newPreloadHint = generatePlaylistPreloadHint(quality, sequence);
  let newMediaSequence: string = '';

  fs.readFile(filePath, 'utf-8', (err, buf) => {
    const data = buf == null ? [header, EMPTY].join(LF) : buf.toString();
    const beforeSegmentList = splitMediaSegment(data);
    const existed = findUncompletedSegment(data);
    if (existed) {
      newMediaSequence = generatePlaylistSegment(quality, sequence, startDate);
    } else {
      newMediaSequence = `#EXT-X-PART:DURATION=1.000000,URI="chunklist_${quality}p_part_${sequence}.ts",INDEPENDENT=YES`;
    }
    const beforeSegments = splitBeforeSegments(beforeSegmentList, existed).trim();
    const mediaPlaylist = [header, EMPTY, beforeSegments, newMediaSequence, newPreloadHint].join(LF);
    fs.writeFile(filePath, mediaPlaylist, () => {});
  });
}

function generatePlaylistHeader(mediaSquenceNumber, startDate) {
  return `#EXTM3U
#EXT-X-VERSION:10
#EXT-X-INDEPENDENT-SEGMENTS
#EXT-X-TARGETDURATION:2
#EXT-X-SERVER-CONTROL:CAN-BLOCK-RELOAD=YES,PART-HOLD-BACK=3.002000
#EXT-X-PART-INF:PART-TARGET=1.000000
#EXT-X-DISCONTINUITY-SEQUENCE:0
#EXT-X-MEDIA-SEQUENCE:${mediaSquenceNumber}
#EXT-X-DATERANGE:ID="nmss-daterange",START-DATE="${startDate}"
`.trim();
}

function generatePlaylistSegment(quality, sequence, startDate) {
  const dateString = new Date(startDate);
  dateString.setSeconds(dateString.getSeconds() + sequence);
  return `
#EXT-X-PROGRAM-DATE-TIME:${dateString.toISOString()}
#EXT-X-PART:DURATION=1.000000,URI="chunklist_${quality}p_part_${sequence - 1}.ts",INDEPENDENT=YES
#EXT-X-PART:DURATION=1.000000,URI="chunklist_${quality}p_part_${sequence}.ts",INDEPENDENT=YES
#EXTINF:2.000000,
chunklist_${quality}p_${Math.floor(sequence / 2)}.ts
`.trim();
}

function generatePlaylistPreloadHint(quality, sequence) {
  return `
#EXT-X-PRELOAD-HINT:TYPE=PART,URI="chunklist_${quality}p_part_${+sequence + 1}.ts"
`.trim();
}

function findUncompletedSegment(data): boolean {
  const [, segments] = data.split(DOUBLE_LF);
  if (!segments) return false;
  const splittedSegment: string[] = segments.split(LF);
  const find = splittedSegment.slice(-2, -1).join('');
  return /^#EXT-X-PART/.test(find);
}

function splitMediaSegment(data) {
  const SEGMENT_REGEX = /^chunklist.*\.ts/;
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

function splitBeforeSegments(beforeSegmentList, existed) {
  if (beforeSegmentList.length === 3 && existed) {
    return beforeSegmentList.slice(1).join(LF);
  }
  return beforeSegmentList.join(LF);
}

export { writeMediaPlaylist };
