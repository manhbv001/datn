import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/BaseQueryDto';
import { PostActionTypes, PostFilters, PostStatuses } from './post.enum';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề không được để trống!' })
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Tiêu đề không được để trống!' })
  @ApiProperty()
  description: string;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(PostStatuses)
  @ApiProperty({ enum: PostStatuses, required: false })
  status: PostStatuses;

  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @ApiProperty()
  topic_ids: number[];
}

export class EditPostDto extends CreatePostDto {}

export class ReactPostDto {
  @IsEnum(PostActionTypes)
  @ApiProperty({ enum: PostActionTypes })
  type: PostActionTypes;
}

export class CommentPostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class QueryPostDto extends BaseQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  author_id: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  topic_ids: string;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(PostFilters)
  @ApiProperty({ enum: PostFilters })
  filter: PostFilters;
}
