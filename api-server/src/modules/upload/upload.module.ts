import { Module } from '@nestjs/common';
import { AwsS3Service } from 'src/shared/services/aws-s3.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [AwsS3Service, UploadService],
})
export class UploadModule {}
