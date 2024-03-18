import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsS3Service } from 'src/shared/services/aws-s3.service';
import { JobController } from './job.controller';
import { Job } from './job.entity';
import { JobService } from './job.service';
import { SavedJob } from './saved-job.entity';

@Module({
  exports: [JobService],
  providers: [JobService, AwsS3Service],
  controllers: [JobController],
  imports: [TypeOrmModule.forFeature([Job, SavedJob])],
})
export class JobModule {}
