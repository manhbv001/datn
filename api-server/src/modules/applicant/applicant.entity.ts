import BaseEntity from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApplicantProfile } from '../applicant-profile/applicant-profile.entity';
import { Job } from '../job/job.entity';
import { Resume } from '../resume/resume.entity';
import { ApplicantStatus } from './applicant.enum';

@Entity('applicants')
export class Applicant extends BaseEntity {
  @Column()
  job_id: number;

  @Column()
  applicant_profile_id: number;

  @Column({ nullable: true })
  resume_id: number;

  @Column('text', { nullable: true })
  cover_letter: string;

  @Column({ default: ApplicantStatus.Processing })
  status: ApplicantStatus;

  @ManyToOne(() => Resume)
  @JoinColumn({ name: 'resume_id' })
  resume: Resume;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => ApplicantProfile)
  @JoinColumn({ name: 'applicant_profile_id' })
  applicant_profile: ApplicantProfile;
}
