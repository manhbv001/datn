import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProvinceService } from './province.service';

@Controller('provinces')
@ApiTags('Province')
export class ProvinceController {
  constructor(private readonly service: ProvinceService) {}

  @Get('seed')
  seed() {
    return this.service.seed();
  }

  @Get('jobs')
  queryWithJobs(@Query('limit', ParseIntPipe) limit: number) {
    return this.service.queryWithJobs(limit);
  }

  @Get()
  query() {
    return this.service.query();
  }
}
