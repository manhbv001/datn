import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantProfileModule } from '../applicant-profile/applicant-profile.module';
import { JobModule } from '../job/job.module';
import { ApplicantController } from './applicant.controller';
import { Applicant } from './applicant.entity';
import { ApplicantService } from './applicant.service';

@Module({
  providers: [ApplicantService],
  controllers: [ApplicantController],
  exports: [ApplicantService],
  imports: [
    TypeOrmModule.forFeature([Applicant]),
    JobModule,
    ApplicantProfileModule,
  ],
})
export class ApplicantModule {}
