import fs from 'fs';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';

ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

const defaultOutputOptions = [
  '-map 0:v',
  '-map 0:a',
  '-hls_time 2',
  '-hls_list_size 3',
  '-hls_segment_type fmp4',
  '-hls_flags split_by_time+independent_segments+omit_endlist',
  '-preset veryfast',
];

function initializeFFMepg(ffmpegInputStream: PassThrough, storagePath: string) {
  return ffmpeg()
    .input(ffmpegInputStream)
    .inputOptions(['-re'])
    .inputFormat('flv')

    .output(`${storagePath}/chunklist_1080p_.m3u8`)
    .videoCodec('libx264')
    .audioCodec('aac')
    .size('1920x1080')
    .videoBitrate('5000k')
    .audioBitrate('192k')
    .outputOptions([...defaultOutputOptions, '-hls_fmp4_init_filename chunkList_1080p_0_0.mp4'])

    .output(`${storagePath}/chunklist_720p_.m3u8`)
    .videoCodec('libx264')
    .audioCodec('aac')
    .size('1280x720')
    .videoBitrate('3000k')
    .audioBitrate('128k')
    .outputOptions([...defaultOutputOptions, '-hls_fmp4_init_filename chunkList_720p_0_0.mp4'])

    .output(`${storagePath}/chunklist_480p_.m3u8`)
    .videoCodec('libx264')
    .audioCodec('aac')
    .size('854x480')
    .videoBitrate('1500k')
    .audioBitrate('96k')
    .outputOptions([...defaultOutputOptions, '-hls_fmp4_init_filename chunkList_480p_0_0.mp4'])

    .output(`${storagePath}/dynamic_thumbnail.jpg`)
    .outputOptions(['-vf', 'fps=1/30', '-update', '1', '-s', '426x240'])

    .on('end', (err, stdout, stderr) => {
      console.log('Finished processing!', err, stdout, stderr);
    })
    .on('close', (code) => {
      console.log(`FFmpeg process exited with code ${code}`);
    })
    .on('error', (code) => {
      console.log(`FFmpeg process error with code ${code}`);
    });
}

function createMasterPlaylist(storagePath) {
  const masterPlaylist = `
#EXTM3U
#EXT-X-VERSION:7

#EXT-X-STREAM-INF:BANDWIDTH=5711200,RESOLUTION=1920x1080,CODECS="avc1.64002a,mp4a.40.2"
chunklist_1080p_.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=3440800,RESOLUTION=1280x720,CODECS="avc1.640020,mp4a.40.2"
chunklist_720p_.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1755600,RESOLUTION=854x480,CODECS="avc1.64001f,mp4a.40.2"
chunklist_480p_.m3u8
`.trim();

  const fileStream = fs.createWriteStream(`${storagePath}/master_playlist.m3u8`);
  fileStream.write(masterPlaylist, () => fileStream.end());
}

export { initializeFFMepg, createMasterPlaylist };
