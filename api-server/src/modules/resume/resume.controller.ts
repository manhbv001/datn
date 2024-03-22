import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateResumeDto, UpdateResumeDto } from './resume.dto';
import { ResumeService } from './resume.service';

@ApiTags('Resume')
@Controller('resumes')
export class ResumeController {
  constructor(private readonly service: ResumeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() payload: CreateResumeDto, @GetUser('id') userId: number) {
    return this.service.create(payload, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateResumeDto,
    @GetUser('id') userId: number
  ) {
    return this.service.update(id, payload, userId);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findByUser(@GetUser('id') userId: number) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: number, @GetUser('id') userId: number) {
    return this.service.delete(id, userId);
  }
}
