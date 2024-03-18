import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from '../user/user.entity';
import { CommentPostDto, QueryPostDto, ReactPostDto } from './post.dto';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private service: PostService) {}

  @Get('react-status/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get react status',
  })
  @ApiOkResponse({
    status: 200,
  })
  getReactStatus(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.service.getReactStatus(id, user);
  }

  @Get('detail/:id')
  @ApiOperation({
    summary: 'Get post',
  })
  @ApiOkResponse({
    type: PostEntity,
  })
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.service.getPostById(id);
  }

  @Get('view/:id')
  @ApiOperation({
    summary: 'Get post detail',
  })
  @ApiOkResponse({
    type: PostEntity,
    status: 200,
  })
  viewPost(@Param('id') id: number) {
    return this.service.viewPost(id);
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get post detail',
  })
  @ApiOkResponse({
    type: PostEntity,
    status: 200,
  })
  getPostBySlug(@Param('slug') slug: string) {
    return this.service.getPostBySlug(slug);
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary: 'Get post list',
  })
  @ApiOkResponse({
    type: PostEntity,
    isArray: true,
    status: 200,
  })
  queryPosts(@Query() params: QueryPostDto, @GetUser() user: User) {
    return this.service.queryPosts(params, user);
  }

  @Post(':id/comment')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Comment post',
  })
  @ApiOkResponse({
    type: PostEntity,
    status: 201,
  })
  commentPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CommentPostDto,
    @GetUser() user: User
  ) {
    return this.service.commentPost(id, payload, user);
  }

  @Patch(':id/react')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'React post',
  })
  @ApiOkResponse({
    status: 200,
  })
  reactPost(
    @Body() payload: ReactPostDto,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ) {
    return this.service.reactPost(id, payload, user);
  }
}
