import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsS3Service } from 'src/shared/services/aws-s3.service';
import { UserModule } from '../user/user.module';
import { EnterpriseController } from './enterprise.controller';
import { Enterprise } from './enterprise.entity';
import { EnterpriseService } from './enterprise.service';

@Module({
  providers: [EnterpriseService, AwsS3Service],
  controllers: [EnterpriseController],
  imports: [TypeOrmModule.forFeature([Enterprise]), UserModule],
  exports: [EnterpriseService],
})
export class EnterpriseModule {}
