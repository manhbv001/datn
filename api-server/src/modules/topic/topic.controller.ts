import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateTopicDto } from './topic.dto';
import { Topic } from './topic.entity';
import { TopicService } from './topic.service';

@ApiTags('Topic')
@Controller('topics')
export class TopicController {
  constructor(private service: TopicService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all topics',
  })
  @ApiOkResponse({
    type: Topic,
    isArray: true,
  })
  queryTopic() {
    return this.service.queryTopics();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create topic',
  })
  @ApiOkResponse({
    type: Topic,
  })
  createTopic(@Body() payload: CreateTopicDto) {
    return this.service.createTopic(payload);
  }
}
