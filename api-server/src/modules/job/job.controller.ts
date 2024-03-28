import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { User } from '../user/user.entity';
import { UserTypes } from '../user/user.enum';
import { CreateJobDto, QueryJobsDto } from './job.dto';
import { JobService } from './job.service';

@ApiTags('Job')
@Controller('jobs')
export class JobController {
  constructor(private readonly service: JobService) {}

  @Post(':id/save')
  @UseGuards(JwtAuthGuard)
  save(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.service.saveJob(id, userId);
  }

  @Post()
  @Roles(UserTypes.Recruiter)
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() payload: CreateJobDto, @GetUser() user: User) {
    return this.service.createOrUpdate(payload, user);
  }

  @Put(':id')
  @Roles(UserTypes.Recruiter)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateJobDto,
    @GetUser() user: User
  ) {
    return this.service.createOrUpdate(payload, user, id);
  }

  @Get('save-status/:id')
  @UseGuards(JwtAuthGuard)
  getSaveStatus(@Param('id') id: number, @GetUser('id') userId: number) {
    return this.service.getSaveStatus(id, userId);
  }

  @Get('saved')
  @UseGuards(OptionalJwtAuthGuard)
  querySavedJobs(@GetUser('id') userId: number) {
    return this.service.getSavedJobs(userId);
  }

  @Get('detail/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Get('/enterprise')
  @Roles(UserTypes.Recruiter)
  @UseGuards(JwtAuthGuard, RoleGuard)
  queryByEnterprise(@Query() query: QueryJobsDto, @GetUser() user: User) {
    return this.service.queryByEnterprise(query, user);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  query(@Query() query: QueryJobsDto, @GetUser('id') userId: number) {
    return this.service.query(query, userId);
  }

  @Patch(':id/state')
  @Roles(UserTypes.System)
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body('state') state: boolean
  ) {
    return this.service.updateState(id, state);
  }
}
