import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResumeDto } from './resume.dto';
import { Resume } from './resume.entity';

export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly repository: Repository<Resume>
  ) {}

  create(payload: CreateResumeDto, userId: number) {
    const newResume = new Resume();

    newResume.information = payload.information;
    newResume.name = payload.name;
    newResume.template_id = payload.template_id;
    newResume.user_id = userId;

    return this.repository.save(newResume);
  }

  findByUser(userId: number) {
    return this.repository.find({
      where: {
        user_id: userId,
      },
    });
  }

  getOne(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }
}
