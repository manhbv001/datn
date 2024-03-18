import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateStatusDto {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
