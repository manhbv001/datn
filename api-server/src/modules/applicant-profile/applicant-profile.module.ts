import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccupationModule } from '../occupation/occupation.module';
import { ProvinceModule } from '../province/province.module';
import { UserModule } from '../user/user.module';
import { ApplicantProfileController } from './applicant-profile.controller';
import { ApplicantProfile } from './applicant-profile.entity';
import { ApplicantProfileService } from './applicant-profile.service';

@Module({
  exports: [ApplicantProfileService],
  providers: [ApplicantProfileService],
  controllers: [ApplicantProfileController],
  imports: [
    TypeOrmModule.forFeature([ApplicantProfile]),
    UserModule,
    OccupationModule,
    ProvinceModule,
  ],
})
export class ApplicantProfileModule {}
