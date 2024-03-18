import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceController } from './province.controller';
import { Province } from './province.entity';
import { ProvinceService } from './province.service';

@Module({
  exports: [ProvinceService],
  providers: [ProvinceService],
  controllers: [ProvinceController],
  imports: [TypeOrmModule.forFeature([Province])],
})
export class ProvinceModule {}
