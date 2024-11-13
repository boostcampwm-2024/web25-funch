import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const END_POINT = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const REGION = 'kr-standard';
const ACCESS_KEY = process.env.ACCESS_KEY as string;
const SECRET_KEY = process.env.SECRET_KEY as string;
const BUCKET_NAME = 'media-storage';

const S3 = new AWS.S3({
  endpoint: END_POINT,
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

async function uploadData(path, filePath) {
  try {
    await S3.upload({
      Bucket: BUCKET_NAME,
      Key: path,
      ACL: 'public-read',
      Body: fs.createReadStream(filePath),
    }).promise();
  } catch (e) {
    console.log(e);
  }
}

function initLocalStorageSetting(storagePath, timerObject) {
  const TIME_OUT = 800;
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
  }

  fs.watch(storagePath, async (eventType, filename) => {
    if (filename!.match(/^(.*\.m4s$)/) && eventType === 'change') {
      clearTimeout(timerObject[filename!]);

      timerObject[filename!] = setTimeout(
        () => uploadData(`zzawang/${filename}`, storagePath + '/' + filename),
        TIME_OUT,
      );
    } else if (filename!.match(/^(.*\.m3u8$)/)) {
      clearTimeout(timerObject[filename!]);
      timerObject[filename!] = setTimeout(
        () => uploadData(`zzawang/${filename}`, storagePath + '/' + filename),
        TIME_OUT,
      );
    } else if (filename!.match(/^(.*\.mp4$)/) && eventType === 'change') {
      clearTimeout(timerObject[filename!]);
      timerObject[filename!] = setTimeout(
        () => uploadData(`zzawang/${filename}`, storagePath + '/' + filename),
        TIME_OUT,
      );
    }
  });
}

export { initLocalStorageSetting };
