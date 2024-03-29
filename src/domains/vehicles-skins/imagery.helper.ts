import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class ImageryHelper {
  public async upload(uuid: string, fileBuffer: Buffer): Promise<string | void> {
    if (process.env.STAGE !== 'production') {
      return Promise.resolve('Skipping bucket transactions outside production environment');
    }

    const s3: S3 = new S3();

    await s3
      .upload({
        Bucket: process.env.BUCKET_NAME,
        Key: uuid,
        Body: Buffer.from(fileBuffer),
      })
      .promise();
  }

  public async remove(key: string): Promise<string | void> {
    if (process.env.STAGE !== 'production') {
      return Promise.resolve('Skipping bucket transactions outside production environment');
    }

    const s3: S3 = new S3();
    await s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: key }).promise();
  }
}
