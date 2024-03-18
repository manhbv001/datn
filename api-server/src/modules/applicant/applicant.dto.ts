import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/BaseQueryDto';
import { ApplicantStatus } from './applicant.enum';

export class CreateApplicantDto {
  @IsNumber()
  @ApiProperty()
  job_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  resume_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  cover_letter: string;
}

export class QueryApplicantsDto extends BaseQueryDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  job_id: number;
}

export class UpdateApplicantStatusDto {
  @ApiProperty()
  @IsEnum(ApplicantStatus)
  status: ApplicantStatus;
}
