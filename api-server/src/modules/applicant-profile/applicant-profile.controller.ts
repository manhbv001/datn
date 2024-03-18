import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserTypes } from '../user/user.enum';
import {
  CreateApplicantProfileDto,
  QueryApplicantProfilesDto,
} from './applicant-profile.dto';
import { ApplicantProfileService } from './applicant-profile.service';

@ApiTags('Applicant Profile')
@Controller('applicant-profiles')
export class ApplicantProfileController {
  constructor(private readonly service: ApplicantProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrUpdate(
    @Body() payload: CreateApplicantProfileDto,
    @GetUser('id') userId: number
  ) {
    return this.service.createOrUpdate(payload, userId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser('id') userId: number) {
    return this.service.getProfile(userId);
  }

  @Get(':id')
  @Roles(UserTypes.Recruiter)
  @UseGuards(JwtAuthGuard, RoleGuard)
  getDetailProfile(@Param('id', ParseIntPipe) id: number) {
    return this.service.getDetailProfile(id);
  }

  @Get()
  query(@Query() params: QueryApplicantProfilesDto) {
    return this.service.query(params);
  }
}
