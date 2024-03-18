import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/BaseQueryDto';
import { ApplicantLevel } from 'src/shared/enum/applicant-level.enum';
import { Education } from 'src/shared/enum/education.enum';
import { Gender } from 'src/shared/enum/gender.enum';
import { WorkArrangement } from 'src/shared/enum/job-arrangement.enum';

export class CreateApplicantProfileDto {
  @IsString()
  display_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(ApplicantLevel)
  level: ApplicantLevel;

  @IsEnum(Education)
  education: Education;

  @IsDateString()
  date_of_birth: Date;

  @IsNumber()
  province_id: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(WorkArrangement)
  work_arrangement: WorkArrangement;

  @IsNumber()
  salary_from: number;

  @IsNumber()
  salary_to: number;

  @IsEnum(ApplicantLevel)
  expect_level: ApplicantLevel;

  @IsNumber({}, { each: true })
  occupation_ids: number[];

  @IsNumber({}, { each: true })
  work_province_ids: number[];
}

export class QueryApplicantProfilesDto extends BaseQueryDto {
  @IsEnum(Education)
  @IsOptional()
  @ApiProperty()
  education: Education;

  @IsEnum(WorkArrangement)
  @IsOptional()
  @ApiProperty()
  work_arrangement: WorkArrangement;

  @IsNumberString()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  province_id: number;

  @IsEnum(Education)
  @IsOptional()
  @ApiProperty()
  gender: Gender;

  @Matches(/^\d{1,}-\d{1,}$/)
  @IsOptional()
  @ApiProperty()
  salary: string;

  @IsEnum(ApplicantLevel)
  @IsOptional()
  @ApiProperty()
  expect_level: ApplicantLevel;

  @IsBooleanString()
  @IsOptional()
  @Type(() => Boolean)
  @ApiProperty()
  finding_job: boolean;

  @IsString()
  @Matches(/^(\d+,)*\d+$/)
  @IsOptional()
  @ApiProperty()
  occupation_ids: string;
}
