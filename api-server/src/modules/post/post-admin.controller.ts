import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from '../user/user.entity';
import { CreatePostDto, EditPostDto, QueryPostDto } from './post.dto';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('admin/posts')
@UseGuards(JwtAuthGuard)
export class PostAdminController {
  constructor(private service: PostService) {}

  @Put(':id')
  @ApiOperation({
    summary: 'Edit post',
  })
  @ApiOkResponse({
    type: PostEntity,
  })
  @UseInterceptors(FileInterceptor('thumbnail'))
  editPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: EditPostDto,
    @GetUser() user: User,
    @UploadedFile() thumbnailFile?: Express.Multer.File
  ) {
    return this.service.createOrUpdatePost(id, payload, user, thumbnailFile);
  }

  @Post()
  @ApiOperation({
    summary: 'Create post',
  })
  @ApiOkResponse({
    type: PostEntity,
    status: 201,
  })
  @UseInterceptors(FileInterceptor('thumbnail'))
  createPost(
    @Body() payload: CreatePostDto,
    @GetUser() user: User,
    @UploadedFile() thumbnailFile?: Express.Multer.File
  ) {
    return this.service.createOrUpdatePost(null, payload, user, thumbnailFile);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Create post',
  })
  deletePost(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.service.deletePost(id, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Query my posts',
  })
  queryPost(@Query() params: QueryPostDto, @GetUser() user) {
    return this.service.queryAdminPosts(params, user.id);
  }
}
