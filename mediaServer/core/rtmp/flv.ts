
        /*
        임시1

        const ffmpeg = spawn('ffmpeg', [
          '-loglevel', 'info',
          '-re',
          '-f', 'flv',
          '-i', '-',
          '-c:v', 'copy',
          '-c:a', 'copy',
          '-hls_time', '2', // 세그먼트 길이를 2초로 설정
          '-hls_list_size', '5', // 플레이리스트에 포함될 세그먼트 수
          '-f', 'hls',
          './hls/stream.m3u8'
        ]);

        ffmpeg.stderr.on('data', (data) => {
          console.error(`FFmpeg stderr: ${data}`);
        });

        ffmpeg.on('close', (code) => {
          console.log(`FFmpeg process exited with code ${code}`);
        });

        ffmpeg.stdin.write(flvHeader);
        ffmpeg.stdin.write(previousTagSize0);

        */

          // 임시 2
          // const now = Date.now();
          // const url = `C:/Users/Home/Desktop/BoostCamp/membership/web25-funch/devMedia/${now}.mp4`;

          // ffmpeg()
          // .input('pipe:0')
          // .inputFormat('flv')
          // .outputOptions([
          //   '-c:v libx264',
          //   '-bsf:v h264_mp4toannexb',
          //   '-f mpegts',
          //   '-movflags +faststart'
          // ])
          // .output(url)
          // .on('end', () => {
          //   console.log('비디오 파일이 생성되었습니다.');
          // })
          // .on('error', (err) => {
          //   console.error('비디오 생성 중 오류 발생:', err);
          // }).pipe(this.workingChunk.payload, { end: true });

        

//  // FLV 헤더 작성 및 FFmpeg stdin으로 전달
// const flvHeader = Buffer.from([
//     0x46, 0x4C, 0x56,
//     0x01,
//     0x05,
//     0x00, 0x00, 0x00, 0x09
//   ]);
//   const previousTagSize0 = Buffer.from([0x00, 0x00, 0x00, 0x00]);
 
//  // FLV 태그 생성 및 FFmpeg로 전달하는 함수
//  function handleRtmpMessage(rtmpMessage) {
//     const flvTagHeader = createFlvTag(rtmpMessage);
//     if (!flvTagHeader) return;
  
//     const previousTagSizeBuffer = Buffer.alloc(4);
//     previousTagSizeBuffer.writeUInt32BE(11 + rtmpMessage.payload.length);
  
//     const dataToSend = Buffer.concat([flvTagHeader, rtmpMessage.payload, previousTagSizeBuffer]);
  
//     // if (!ffmpeg.stdin.write(dataToSend)) {
//     //   ffmpeg.stdin.once('drain', () => {
//         console.log('FFmpeg stdin drain 이벤트 발생');
//     //   });
//     // }
//   }
  

// function createFlvTag(rtmpMessage) {
//     const { payload, messageHeader } = rtmpMessage;
//     let tagType;
//     // if (rtmpMessage.messageHeader.typeId === VIDEO_MESSAGE) {
//     //   tagType = 0x09; // 비디오 태그
//     // } else if (rtmpMessage.messageHeader.typeId === AUDIO_MESSAGE) {
//     //   tagType = 0x08; // 오디오 태그
//     // } else {
//     //   // 다른 타입은 처리하지 않음
//     //   return null;
//     // }
  
//     const dataSize = payload.length;
//     const timestamp = messageHeader.timestamp + messageHeader.timestampDelta;

//     const flvTagHeader = Buffer.alloc(11);
  
//     // Tag Type
//     flvTagHeader[0] = tagType;
  
//     // Data Size
//     flvTagHeader.writeUIntBE(dataSize, 1, 3);
  
//     // Timestamp
//     flvTagHeader.writeUIntBE(timestamp & 0xFFFFFF, 4, 3);
//     flvTagHeader[7] = (timestamp >> 24) & 0xFF;
  
//     // StreamID
//     flvTagHeader.writeUIntBE(0, 8, 3);
  
//     return flvTagHeader;
// }