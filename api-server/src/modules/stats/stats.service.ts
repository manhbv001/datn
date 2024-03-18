import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantProfile } from '../applicant-profile/applicant-profile.entity';
import { Applicant } from '../applicant/applicant.entity';
import { ApplicantStatus } from '../applicant/applicant.enum';
import { Enterprise } from '../enterprise/enterprise.entity';
import { Job } from '../job/job.entity';
import { User } from '../user/user.entity';

export class StatsService {
  constructor(
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(Applicant) private applicantRepo: Repository<Applicant>,
    @InjectRepository(ApplicantProfile)
    private applicantProfileRepo: Repository<ApplicantProfile>,
    @InjectRepository(Enterprise) private enterpriseRepo: Repository<Enterprise>
  ) {}
  async applicant(user: User) {
    const totalAppliedJobPrs = this.applicantRepo.count({
      where: {
        applicant_profile_id: user.applicant_profile_id,
      },
    });

    const totalSavedJobPrs = this.applicantRepo.count({
      where: {
        applicant_profile_id: user.applicant_profile_id,
      },
    });
  }

  async recruit(enterpriseId) {
    const totalApplicantsPrs = this.applicantRepo.count({
      where: {
        job: {
          enterprise_id: enterpriseId,
        },
      },
    });

    const totalProcessingPrs = this.applicantRepo.count({
      where: {
        status: ApplicantStatus.Processing,
        job: {
          enterprise_id: enterpriseId,
        },
      },
      relations: ['job'],
    });

    const totalPassedPrs = this.applicantRepo.count({
      where: {
        status: ApplicantStatus.Passed,
        job: {
          enterprise_id: enterpriseId,
        },
      },
      relations: ['job'],
    });

    const totalRejectedPrs = this.applicantRepo.count({
      where: {
        status: ApplicantStatus.Rejected,
        job: {
          enterprise_id: enterpriseId,
        },
      },
      relations: ['job'],
    });

    const totalInterviewedPrs = this.applicantRepo.count({
      where: {
        status: ApplicantStatus.Interviewed,
        job: {
          enterprise_id: enterpriseId,
        },
      },
      relations: ['job'],
    });

    const totalScheduledPrs = this.applicantRepo.count({
      where: {
        status: ApplicantStatus.Scheduled,
        job: {
          enterprise_id: enterpriseId,
        },
      },
      relations: ['job'],
    });

    const [
      totalApplicants,
      totalProcessing,
      totalPassed,
      totalRejected,
      totalInterviewed,
      totalScheduled,
    ] = await Promise.all([
      totalApplicantsPrs,
      totalProcessingPrs,
      totalPassedPrs,
      totalRejectedPrs,
      totalInterviewedPrs,
      totalScheduledPrs,
    ]);

    return {
      totalApplicants,
      totalProcessing,
      totalPassed,
      totalRejected,
      totalInterviewed,
      totalScheduled,
    };
  }

  async admin() {
    const totalApplicantsPrs = this.applicantRepo.count();
    const totalProfilesPrs = this.applicantProfileRepo.count();
    const totalPassedApplicantsPrs = this.applicantRepo.count({
      where: {
        status: ApplicantStatus.Passed,
      },
    });
    const totalEnterprisesPrs = this.enterpriseRepo.count();

    const [
      totalApplicants,
      totalPassedApplicants,
      totalProfiles,
      totalEnterprises,
    ] = await Promise.all([
      totalApplicantsPrs,
      totalProfilesPrs,
      totalPassedApplicantsPrs,
      totalEnterprisesPrs,
    ]);

    return {
      totalApplicants,
      totalPassedApplicants,
      totalProfiles,
      totalEnterprises,
    };
  }
}
