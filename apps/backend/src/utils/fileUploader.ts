interface IFileUploader {
  filePath: string;
  bucketName: string;
  newFileNameKey: string;
}

import fs from 'fs';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { aws_access_key_id, aws_bucket_region, aws_secret_access_key } from '@config/index';

const client = new S3Client({
  region: aws_bucket_region as string,
  credentials: {
    accessKeyId: aws_access_key_id as string,
    secretAccessKey: aws_secret_access_key as string,
  },
});

export async function uploadFileToS3({ filePath, bucketName, newFileNameKey }: IFileUploader): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
      reject(err);
    });
    fileStream.on('open', async function () {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileNameKey,
        Body: fileStream,
      });

      try {
        await client.send(command);
        const url = `https://${bucketName}.s3.${aws_bucket_region}.amazonaws.com/${newFileNameKey}`;
        resolve(url);
      } catch (err) {
        reject(err);
      }
    });
  });
}
