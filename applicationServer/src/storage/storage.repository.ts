import AWS from 'aws-sdk';
import { BUCKET_END_POINT_URL, REGION, BUCKET_NAME } from '@src/constants';

const BucketEndPoint = new AWS.Endpoint(BUCKET_END_POINT_URL);

const S3 = new AWS.S3({
  endpoint: BucketEndPoint,
  region: REGION,
  credentials: {
    accessKeyId: process.env.NCP_ACCESS_KEY,
    secretAccessKey: process.env.NCP_SECRET_KEY,
  },
});

async function uploadData(path, data) {
  try {
    await S3.upload({
      Bucket: BUCKET_NAME,
      Key: path,
      ACL: 'public-read',
      Body: data,
    }).promise();
  } catch (e) {
    return e;
  }
}

export { uploadData };
