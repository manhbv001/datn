import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from 'src/shared/entities/base.entity';
import { Utils } from 'src/utils/data.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ApplicantProfile } from '../applicant-profile/applicant-profile.entity';
import { Job } from '../job/job.entity';

@Entity('occupations')
export class Occupation extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  slug: string;

  @OneToMany(() => Job, (job) => job.occupation)
  jobs: Job[];

  @ManyToMany(() => ApplicantProfile, (profile) => profile.occupations)
  applicantProfiles: ApplicantProfile[];

  @BeforeInsert()
  @BeforeUpdate()
  genSlug() {
    this.slug = Utils.toSlug(this.name);
  }
}
