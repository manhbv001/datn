import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateOccupationDto } from './occupation.dto';
import { Occupation } from './occupation.entity';

export class OccupationService {
  constructor(
    @InjectRepository(Occupation)
    private readonly repository: Repository<Occupation>
  ) {}

  create(payload: CreateOccupationDto) {
    const newOccupation = new Occupation();
    newOccupation.name = payload.name;

    return this.repository.save(newOccupation);
  }

  query() {
    return this.repository.find();
  }

  getByIds(ids: number[]) {
    return this.repository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async queryWithJobs(limit: number) {
    const result = await this.repository
      .createQueryBuilder('occupation')
      .leftJoinAndSelect('occupation.jobs', 'jobs')
      .select('occupation.id', 'id')
      .addSelect('occupation.name', 'name')
      .addSelect('COUNT(jobs.id)', 'totalJobs')
      .groupBy('occupation.id')
      .having('totalJobs > 0')
      .orderBy('totalJobs', 'DESC')
      .limit(limit)
      .getRawMany();

    return result.map((item) => ({
      ...item,
      totalJobs: Number(item.totalJobs || 0),
    }));
  }
}
