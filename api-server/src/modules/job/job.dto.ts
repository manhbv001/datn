import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/BaseQueryDto';
import { ApplicantLevel } from 'src/shared/enum/applicant-level.enum';
import { Gender } from 'src/shared/enum/gender.enum';
import { WorkArrangement } from 'src/shared/enum/job-arrangement.enum';
import { JobStatus } from './job.enum';

export class CreateJobDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsEnum(JobStatus)
  @IsOptional()
  @ApiProperty()
  status: JobStatus;

  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  benefit: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  requirement: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  work_place: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  work_time: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ nullable: true })
  salary_from: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  salary_to: number;

  @IsNumber()
  @ApiProperty()
  headcount: number;

  @IsEnum(ApplicantLevel)
  @ApiProperty()
  level: ApplicantLevel;

  @IsEnum(Gender)
  @IsOptional()
  @ApiProperty()
  gender: Gender;

  @IsEnum(WorkArrangement)
  @ApiProperty()
  arrangement: WorkArrangement;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  expired_date: string;

  @IsNumber()
  @ApiProperty()
  province_id: number;

  @IsNumber()
  @ApiProperty()
  occupation_id: number;
}

export class QueryJobsDto extends BaseQueryDto {
  @IsEnum(ApplicantLevel)
  @IsOptional()
  level: ApplicantLevel;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  province_id: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  occupation_id: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  enterprise_id: number;

  @Matches(/^\d{1,}-\d{1,}$/)
  @IsOptional()
  @ApiProperty()
  salary_range: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  except_item: number;
}
