import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from 'src/utils/data.util';
import { LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateJobDto, QueryJobsDto } from './job.dto';
import { Job } from './job.entity';
import { JobStatus } from './job.enum';
import { SavedJob } from './saved-job.entity';

export class JobService {
  constructor(
    @InjectRepository(Job) private readonly repository: Repository<Job>,
    @InjectRepository(SavedJob)
    private readonly savedRepository: Repository<SavedJob>
  ) {}

  async createOrUpdate(payload: CreateJobDto, user: User, id?: number) {
    const newJob = new Job();

    if (id) {
      const existed = await this.repository.exist({ where: { id } });
      if (!existed) throw new BadRequestException('Not found');

      newJob.id = id;
      newJob.status = payload.status;
    }

    newJob.title = payload.title;
    newJob.description = payload.description;
    newJob.benefit = payload.benefit;
    newJob.requirement = payload.requirement;
    newJob.work_place = payload.work_place;
    newJob.work_time = payload.work_time;
    newJob.enterprise_id = user.enterprise_id;
    newJob.headcount = payload.headcount;
    newJob.level = payload.level;
    newJob.province_id = payload.province_id;
    newJob.occupation_id = payload.occupation_id;
    newJob.salary_from = payload.salary_from;
    newJob.salary_to = payload.salary_to;
    newJob.expired_date = new Date(payload.expired_date);

    return await this.repository.save(newJob);
  }

  async query(payload: QueryJobsDto, userId?: number) {
    const { where, skip, take } = Utils.parseQueryDto(payload);

    const whereParams = { ...where, status: JobStatus.Hiring };
    delete whereParams['salary_range'];
    delete whereParams['except_item'];

    if (where.salary_range) {
      const [salary_from, salary_to] = where.salary_range?.split('-');
      whereParams['salary_from'] = MoreThanOrEqual(+salary_from);
      whereParams['salary_to'] = LessThanOrEqual(+salary_to);
    }

    if (where.except_item) {
      whereParams['id'] = Not(where.except_item);
    }

    const queryBuilder = this.repository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.province', 'province')
      .leftJoinAndSelect('job.enterprise', 'enterprise')
      .loadRelationCountAndMap('job.total_saves', 'job.saves');

    if (userId) {
      queryBuilder.loadRelationCountAndMap(
        'job.saved',
        'job.saves',
        'save',
        (qb) => qb.where('save.user_id = :userId', { userId })
      );
    }

    queryBuilder
      .where(whereParams)
      .orderBy(
        `job.${payload.order_key || 'created_at'}`,
        payload.order_by || 'DESC'
      )
      .take(take)
      .skip(skip);

    const [jobs, total] = await queryBuilder.getManyAndCount();

    return {
      jobs: jobs.map((job) => ({
        ...job,
        saved: !!(job as any).saved,
      })),
      total,
    };
  }

  async queryByEnterprise(payload: QueryJobsDto, user: User) {
    const { where, skip, take } = Utils.parseQueryDto(payload);

    const whereParams = { ...where, enterprise_id: user.enterprise_id };
    delete whereParams['salary'];
    delete whereParams['except_item'];

    if (where.salary) {
      const [salary_from, salary_to] = where.salary?.split('-');
      whereParams['salary_from'] = MoreThanOrEqual(+salary_from);
      whereParams['salary_to'] = LessThanOrEqual(+salary_to);
    }

    const queryBuilder = this.repository
      .createQueryBuilder('job')
      .loadRelationCountAndMap('job.total_applicants', 'job.applicants');

    queryBuilder
      .where(whereParams)
      .orderBy(
        `job.${payload.order_key || 'created_at'}`,
        payload.order_by || 'DESC'
      )
      .take(take)
      .skip(skip);

    const [jobs, total] = await queryBuilder.getManyAndCount();

    return {
      jobs: jobs.map((job) => ({
        ...job,
        saved: !!(job as any).saved,
      })),
      total,
    };
  }

  async saveJob(id: number, userId: number) {
    const isRevert = await this.savedRepository.exist({
      where: {
        user_id: userId,
        job_id: id,
      },
    });

    if (!isRevert) {
      const newSaved = new SavedJob();
      newSaved.job_id = id;
      newSaved.user_id = userId;

      await this.savedRepository.save(newSaved);

      return true;
    } else {
      await this.savedRepository.delete({
        user_id: userId,
        job_id: id,
      });

      return {
        isRevert: true,
      };
    }
  }

  async getSaveStatus(id: number, userId: number) {
    const saved = await this.savedRepository.exist({
      where: {
        job_id: id,
        user_id: userId,
      },
    });

    return { saved };
  }

  findById(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  findBySlug(slug: string) {
    return this.repository.findOne({
      where: {
        slug,
      },
      relations: ['enterprise', 'province', 'occupation'],
    });
  }

  getSavedJobs(userId: number) {
    return this.repository.find({
      where: {
        saves: {
          user_id: userId,
        },
      },
      relations: ['enterprise', 'province'],
    });
  }

  updateState(id: number, isActive: boolean) {
    return this.repository.update(id, { is_active: isActive });
  }
}
