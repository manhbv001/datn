import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantProfile } from '../applicant-profile/applicant-profile.entity';
import { Applicant } from '../applicant/applicant.entity';
import { Enterprise } from '../enterprise/enterprise.entity';
import { Job } from '../job/job.entity';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job, Applicant, ApplicantProfile, Enterprise]),
  ],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
