import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { User } from '../user/user.entity';
import { UserTypes } from '../user/user.enum';
import {
  CreateApplicantDto,
  QueryApplicantsDto,
  UpdateApplicantStatusDto,
} from './applicant.dto';
import { ApplicantService } from './applicant.service';

@ApiTags('Applicant')
@Controller('applicants')
export class ApplicantController {
  constructor(private readonly service: ApplicantService) {}

  @Post()
  @Roles(UserTypes.Applicant)
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() payload: CreateApplicantDto, @GetUser() user: User) {
    return this.service.create(payload, user);
  }

  @Get('apply-status/:id')
  @UseGuards(JwtAuthGuard)
  getSaveStatus(@Param('id') id: number, @GetUser() user: User) {
    return this.service.getApplyStatus(id, user);
  }

  @Get('enterprise')
  @Roles(UserTypes.Recruiter)
  @UseGuards(JwtAuthGuard, RoleGuard)
  queryByEnterprise(
    @Query() query: QueryApplicantsDto,
    @GetUser('enterprise_id') enterprise_id: number
  ) {
    return this.service.getByEnterprise(query, enterprise_id);
  }

  @Get('job/:jobId')
  @UseGuards(JwtAuthGuard)
  queryByJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @GetUser() user: User
  ) {
    return this.service.queryByJob(jobId, user);
  }

  @Get('applied-jobs')
  @UseGuards(JwtAuthGuard)
  getAppliedJobs(@GetUser() user: User) {
    return this.service.queryAppliedJobs(user);
  }

  @Get(':id')
  @Roles(UserTypes.Recruiter)
  @UseGuards(JwtAuthGuard, RoleGuard)
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.service.getDetail(id);
  }

  @Put(':id/status')
  @Roles(UserTypes.Recruiter)
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateApplicantStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateApplicantStatusDto,
    @GetUser('enterprise_id') enterpriseId: number
  ) {
    return this.service.updateStatus(id, payload.status, enterpriseId);
  }
}
