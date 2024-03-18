import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './topic.dto';
import { Topic } from './topic.entity';

export class TopicService {
  constructor(@InjectRepository(Topic) private repository: Repository<Topic>) {}

  async queryTopics() {
    const topics = await this.repository.find({
      where: {
        is_active: true,
      },
    });
    return topics;
  }

  async createTopic(payload: CreateTopicDto) {
    const newTopic = new Topic();
    newTopic.name = payload.name;

    return this.repository.save(newTopic);
  }
}
