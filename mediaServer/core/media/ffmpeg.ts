import fs from 'fs';
import path from 'path';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';
import { logger } from '@/logger';
import { writeMediaPlaylist } from '@hls/playlist';

ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

const defaultOutputOptions = [
  '-map 0:v',
  '-map 0:a',
  '-preset ultrafast',
  '-profile:v baseline',
  '-level 4.1',
  '-f segment',
  '-g 30',
];

function initializeFFMpeg(ffmpegInputStream: PassThrough, storagePath: string) {
  const startDate = new Date().toISOString();
  return ffmpeg()
    .input(ffmpegInputStream)
    .inputOptions(['-re'])
    .inputFormat('flv')

    .output(`${storagePath}/chunklist_1080p_%d.ts`)
    .videoCodec('libx264')
    .audioCodec('aac')
    .size('1920x1080')
    .videoBitrate('8000k')
    .audioBitrate('192k')
    .outputOptions([...defaultOutputOptions, '-segment_time 2'])

    .output(`${storagePath}/chunklist_1080p_part_%d.ts`)
    .videoCodec('libx264')
    .audioCodec('aac')
    .size('1920x1080')
    .videoBitrate('8000k')
    .audioBitrate('192k')
    .outputOptions([...defaultOutputOptions, '-segment_time 1'])

    .output(`${storagePath}/dynamic_thumbnail.jpg`)
    .outputOptions(['-vf', 'fps=1/30', '-update', '1', '-s', '426x240'])

    .on('stderr', async (stderrLine) => {
      if (stderrLine.includes('Opening')) {
        const match = stderrLine.match(/(chunklist_(.+)p_part_(\d+)\.ts)/);
        if (match) {
          const [, fileName, quality, partSequence] = match;
          const sequence = Math.ceil(partSequence / 2);

          const filePath = path.join(__dirname, '../../', storagePath, fileName);
          fs.watchFile(filePath, (file) => {
            if (file.size !== 0) {
              fs.unwatchFile(filePath);
              let mediaSquenceNumber = sequence - 2;
              if (mediaSquenceNumber < 0) mediaSquenceNumber = 0;
              const m3u8FilePath = path.join(__dirname, '../../', storagePath, `chunklist_${quality}p.m3u8`);
              writeMediaPlaylist(mediaSquenceNumber, quality, partSequence, m3u8FilePath, startDate);
            }
          });
        }
      }
    })

    .on('close', (code) => {
      logger.error(`FFmpeg process exited with code ${code}`);
    })
    .on('error', (code, stdout, stderr) => {
      logger.error(`FFmpeg process error with code: ${code}\nstdout: ${stdout}\nstderr: ${stderr}`);
      initializeFFMpeg(ffmpegInputStream, storagePath);
    });
}

function createMasterPlaylist(storagePath) {
  const masterPlaylist = `
#EXTM3U
#EXT-X-VERSION:10

#EXT-X-STREAM-INF:BANDWIDTH=8711200,RESOLUTION=1920x1080,CODECS="avc1.64002a,mp4a.40.2"
chunklist_1080p.m3u8
`.trim();
  /*#EXT-X-STREAM-INF:BANDWIDTH=5440800,RESOLUTION=1280x720,CODECS="avc1.640020,mp4a.40.2"
  chunklist_720p.m3u8*/

  const fileStream = fs.createWriteStream(`${storagePath}/master_playlist.m3u8`);
  fileStream.write(masterPlaylist, () => fileStream.end());
}

export { initializeFFMpeg, createMasterPlaylist };
