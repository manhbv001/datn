import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/BaseQueryDto';

export class CreateEnterpriseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ nullable: true })
  @IsString()
  description: string;
}

export class UpdateEnterpriseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ nullable: true })
  @IsString()
  description: string;

  @ApiProperty({ nullable: true })
  @IsString()
  cover: string;

  @ApiProperty({ nullable: true })
  @IsString()
  logo: string;
}

export class QueryEnterprisesDto extends BaseQueryDto {}
