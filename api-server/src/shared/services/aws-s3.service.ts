import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ClientConfiguration } from 'aws-sdk/clients/acm';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { UploadFolders } from '../enum/upload-folders.enum';

@Injectable()
export class AwsS3Service {
  private s3: S3;

  constructor() {
    const clientConfig: ClientConfiguration = {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGIONS,
    };
    this.s3 = new S3(clientConfig);
  }

  public async upload(
    file: Express.Multer.File,
    folder: UploadFolders
  ): Promise<S3.ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
      const contentType = file.mimetype.split('/')[1];

      const payload: PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `${folder}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: contentType,
      };

      this.s3.upload(payload, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}
