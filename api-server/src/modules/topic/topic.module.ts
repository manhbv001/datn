import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic.entity';

@Module({
  providers: [TopicService],
  exports: [TopicService],
  controllers: [TopicController],
  imports: [TypeOrmModule.forFeature([Topic])],
})
export class TopicModule {}
