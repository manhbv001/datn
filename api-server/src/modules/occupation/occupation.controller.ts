import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateOccupationDto } from './occupation.dto';
import { OccupationService } from './occupation.service';

@Controller('occupations')
@ApiTags('Occupation')
export class OccupationController {
  constructor(private readonly service: OccupationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() payload: CreateOccupationDto) {
    return this.service.create(payload);
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
