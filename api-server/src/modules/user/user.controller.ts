import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FollowAuthorDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Người dùng')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('profile/:id/followers')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary: 'Get profile followers',
  })
  getProfileFollowers(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ) {
    return this.service.getFollowers(id, user);
  }

  @Get('profile/:id/followings')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary: 'Get profile followers',
  })
  getProfileFollowings(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ) {
    return this.service.getFollowings(id, user);
  }

  @Get('authors/:id/status')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary: 'Follow status author',
  })
  getFollowStatus(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ) {
    return this.service.getFollowStatus(id, user);
  }

  @Get('authors')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary: 'feature authors',
  })
  getFeaturedAuthors(@GetUser() user: User) {
    return this.service.getFeaturedAuthors(user);
  }

  @Get(':username')
  @ApiOperation({
    summary: 'User profile',
  })
  getUserProfile(@Param('username') username: string) {
    return this.service.getUserProfile(username);
  }

  @Post('follow')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Follow author',
  })
  follow(@Body() body: FollowAuthorDto, @GetUser() user: User) {
    return this.service.follow(body, user);
  }

  @Put()
  @ApiOperation({
    summary: 'Cập nhật tài khoản',
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(JwtAuthGuard)
  update(
    @Body() body: UpdateUserDto,
    @GetUser() user: User,
    @UploadedFile() avatar?: Express.Multer.File
  ) {
    return this.service.update(body, user, avatar);
  }
}
