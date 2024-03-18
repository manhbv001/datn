import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccupationController } from './occupation.controller';
import { Occupation } from './occupation.entity';
import { OccupationService } from './occupation.service';

@Module({
  exports: [OccupationService],
  providers: [OccupationService],
  controllers: [OccupationController],
  imports: [TypeOrmModule.forFeature([Occupation])],
})
export class OccupationModule {}
