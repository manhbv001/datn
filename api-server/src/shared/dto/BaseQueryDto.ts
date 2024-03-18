import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

enum ESortBy {
  Desc = 'DESC',
  Asc = 'ASC',
}

export class BaseQueryDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'trang' })
  page?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'số bản ghi' })
  size?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'từ khóa' })
  search?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'điều kiện sắp xếp' })
  order_key?: string;

  @IsEnum(ESortBy)
  @IsOptional()
  @ApiProperty({ required: false, description: 'giá trị sắp xếp' })
  order_by?: ESortBy;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'ngày bắt đầu' })
  start_date: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'ngày kết thúc' })
  end_date: string;
}
