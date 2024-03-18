import BaseEntity from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { ApplicantProfile } from '../applicant-profile/applicant-profile.entity';
import { Job } from '../job/job.entity';

@Entity('provinces')
export class Province extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ default: 0 })
  priority: number;

  @OneToMany(() => Job, (job) => job.province)
  jobs: Job[];

  @ManyToMany(() => ApplicantProfile, (profile) => profile.occupations)
  applicantProfiles: ApplicantProfile[];
}
