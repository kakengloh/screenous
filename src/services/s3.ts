import { S3 } from 'aws-sdk';

class S3Client {
  private client: S3;

  constructor() {
    this.client = new S3({
      apiVersion: '2006-03-01',
      region: process.env.S3_REGION,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });
  }

  async presignGet(key: string) {
    return await this.client.getSignedUrlPromise('getObject', {
      Bucket: 'screenous',
      Key: key,
      Expires: 60 * 10, // 10 minutes
    });
  }

  async presignPost(key: string, contentType: string) {
    return Promise.resolve(
      this.client.createPresignedPost({
        Bucket: 'screenous',
        Fields: {
          key,
          'Content-Type': contentType,
        },
        Expires: 60, // seconds
        Conditions: [
          ['content-length-range', 0, 5e8], // up to 500 MB
        ],
      }),
    );
  }
}

export default new S3Client();
