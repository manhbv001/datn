import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import {
  ScheduleModule as NestScheduleModule,
  ScheduleModule,
} from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './data-source/database.module';
import { ApplicantProfileModule } from './modules/applicant-profile/applicant-profile.module';
import { ApplicantModule } from './modules/applicant/applicant.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { JobModule } from './modules/job/job.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { OccupationModule } from './modules/occupation/occupation.module';
import { PostModule } from './modules/post/post.module';
import { ProvinceModule } from './modules/province/province.module';
import { ResumeModule } from './modules/resume/resume.module';
import { StatsModule } from './modules/stats/stats.module';
import { TopicModule } from './modules/topic/topic.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    NestScheduleModule.forRoot(),
    MulterModule.register(),
    ScheduleModule,
    ProvinceModule,
    OccupationModule,
    UserModule,
    PostModule,
    TopicModule,
    AuthModule,
    MetadataModule,
    EnterpriseModule,
    JobModule,
    ApplicantProfileModule,
    ApplicantModule,
    ResumeModule,
    StatsModule,
    UploadModule,
  ],
  exports: [DatabaseModule],
})
export class AppModule {}
