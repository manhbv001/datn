import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNumber()
  @ApiProperty()
  province_id: number;

  @IsNumber()
  @ApiProperty()
  district_id: number;

  @IsNumber()
  @ApiProperty()
  ward_id: number;

  @IsString()
  @ApiProperty()
  address_line: string;
}
