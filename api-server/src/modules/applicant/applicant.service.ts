import { BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from 'src/utils/data.util';
import { Repository } from 'typeorm';
import { JobService } from '../job/job.service';
import { User } from '../user/user.entity';
import { CreateApplicantDto, QueryApplicantsDto } from './applicant.dto';
import { Applicant } from './applicant.entity';
import { ApplicantStatus } from './applicant.enum';

export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
    private readonly jobService: JobService
  ) {}

  async create(payload: CreateApplicantDto, user: User) {
    const existed = await this.repository.exist({
      where: {
        job_id: payload.job_id,
        applicant_profile_id: user.applicant_profile_id,
      },
    });

    if (existed)
      throw new ConflictException('Bạn đã ứng tuyển vị trí này trước đó');

    const newApplicant = new Applicant();

    newApplicant.applicant_profile_id = user.applicant_profile_id;
    newApplicant.job_id = payload.job_id;
    newApplicant.resume_id = payload.resume_id;
    newApplicant.cover_letter = payload.cover_letter;

    return this.repository.save(newApplicant);
  }

  async queryByJob(jobId: number, user: User) {
    const enterpriseId = user.enterprise_id;

    const job = await this.jobService.findById(jobId);

    if (job?.enterprise_id !== enterpriseId)
      throw new BadRequestException('Job not found');

    const [applicants, total] = await this.repository.findAndCount({
      where: {
        job_id: job.id,
      },
    });

    return {
      applicants,
      total,
    };
  }

  async queryAppliedJobs(user: User) {
    if (!user.applicant_profile_id)
      return {
        appliedJobs: [],
        total: 0,
      };
    const [applicants, total] = await this.repository.findAndCount({
      where: {
        applicant_profile_id: user.applicant_profile_id,
      },
      relations: ['job', 'job.province', 'job.enterprise'],
    });

    return {
      appliedJobs: applicants.map((item) => ({
        ...item.job,
        applyTime: item.created_at,
      })),
      total,
    };
  }

  async getApplyStatus(jobId: number, user: User) {
    if (!user.applicant_profile_id) return { applied: false };

    const applied = await this.repository.exist({
      where: {
        job_id: jobId,
        applicant_profile_id: user.applicant_profile_id,
      },
    });

    return { applied };
  }

  async getByEnterprise(query: QueryApplicantsDto, enterpriseId: number) {
    const { where, skip, take } = Utils.parseQueryDto(query);

    const [rs, count] = await this.repository.findAndCount({
      where: {
        ...where,
        job: {
          enterprise_id: enterpriseId,
        },
      },
      relations: ['job', 'applicant_profile'],
      skip,
      take,
    });

    return {
      applicants: rs,
      total: count,
    };
  }

  async getDetail(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: ['applicant_profile', 'resume', 'job'],
    });
  }

  async updateStatus(
    id: number,
    status: ApplicantStatus,
    userEnterpriseId: number
  ) {
    const record = await this.repository.findOne({
      where: {
        id,
        job: {
          enterprise_id: userEnterpriseId,
        },
      },
      relations: ['job'],
    });

    if (!record) throw new BadRequestException('Bad request');

    record.status = status;

    await this.repository.save(record);

    return true;
  }
}
