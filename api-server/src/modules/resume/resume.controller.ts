import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateResumeDto } from './resume.dto';
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

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findByUser(@GetUser('id') userId: number) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getOne(id);
  }
}
