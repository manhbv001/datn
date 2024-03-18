import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserTypes } from './user.enum';

export class FollowAuthorDto {
  @ApiProperty()
  @IsNumber()
  author_id: number;
}

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  username: string;

  @IsString()
  @ApiProperty()
  fullname: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  fullname: string;

  type?: UserTypes;

  @IsString()
  @ApiProperty()
  @MinLength(6)
  password: string;
}
