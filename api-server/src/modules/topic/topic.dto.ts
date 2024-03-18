import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QueryTopicDto {}

export class CreateTopicDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
