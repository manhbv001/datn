import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { provinceData } from './data';
import { Province } from './province.entity';

export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly repository: Repository<Province>
  ) {}

  seed() {
    const data = provinceData;

    const provinceRecords = data.map((item) => {
      const newProvince = new Province();
      newProvince.name = item;

      return newProvince;
    });

    return this.repository.save(provinceRecords);
  }

  query() {
    return this.repository.find({
      where: {
        is_active: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async queryWithJobs(limit: number) {
    const result = await this.repository
      .createQueryBuilder('province')
      .leftJoinAndSelect('province.jobs', 'jobs')
      .select('province.id', 'id')
      .addSelect('province.name', 'name')
      .addSelect('COUNT(jobs.id)', 'totalJobs')
      .groupBy('province.id')
      .having('totalJobs > 0')
      .orderBy('totalJobs', 'DESC')
      .limit(limit)
      .getRawMany();

    return result.map((item) => ({
      ...item,
      totalJobs: Number(item.totalJobs || 0),
    }));
  }

  getByIds(ids: number[]) {
    return this.repository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
