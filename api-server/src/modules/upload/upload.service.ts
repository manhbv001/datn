import { Injectable } from '@nestjs/common';
import { UploadFolders } from 'src/shared/enum/upload-folders.enum';
import { AwsS3Service } from 'src/shared/services/aws-s3.service';

@Injectable()
export class UploadService {
  constructor(private readonly awsService: AwsS3Service) {}

  async uploadFile(file: Express.Multer.File) {
    const result = await this.awsService.upload(file, UploadFolders.Avatar);
    return { url: `${process.env.AWS_S3_STATIC_ENDPOINT}/${result.Key}` };
  }
}
