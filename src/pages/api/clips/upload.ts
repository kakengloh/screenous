import { S3 } from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import s3 from 'services/s3';
import shortUUID from 'short-uuid';

export interface UploadClipResponse extends S3.PresignedPost {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadClipResponse>,
) {
  const id = shortUUID.generate();

  const post = await s3.presignPost(`clips/${id}.webm`, 'video/webm');

  res.status(200).json({
    ...post,
    id,
  });
}
