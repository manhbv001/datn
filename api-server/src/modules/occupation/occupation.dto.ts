import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOccupationDto {
  @IsString()
  @ApiProperty()
  name: string;
}
