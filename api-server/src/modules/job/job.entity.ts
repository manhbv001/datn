import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import BaseEntity from 'src/shared/entities/base.entity';
import { ApplicantLevel } from 'src/shared/enum/applicant-level.enum';
import { Gender } from 'src/shared/enum/gender.enum';
import { WorkArrangement } from 'src/shared/enum/job-arrangement.enum';
import { Utils } from 'src/utils/data.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Applicant } from '../applicant/applicant.entity';
import { Enterprise } from '../enterprise/enterprise.entity';
import { Occupation } from '../occupation/occupation.entity';
import { Province } from '../province/province.entity';
import { JobStatus } from './job.enum';
import { SavedJob } from './saved-job.entity';

@Entity('jobs')
export class Job extends BaseEntity {
  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  thumbnail: string;

  @Column('text', { nullable: true })
  @ApiProperty({ nullable: true })
  description: string;

  @Column('text', { nullable: true })
  @ApiProperty({ nullable: true })
  benefit: string;

  @Column('text', { nullable: true })
  @ApiProperty({ nullable: true })
  requirement: string;

  @Column('text', { nullable: true })
  @ApiProperty({ nullable: true })
  work_place: string;

  @Column('text', { nullable: true })
  @ApiProperty({ nullable: true })
  work_time: string;

  @Column({ nullable: true })
  salary_from: number;

  @Column({ nullable: true })
  salary_to: number;

  @Column({ default: 1 })
  headcount: number;

  @Column({ nullable: true })
  level: ApplicantLevel;

  @Column({ nullable: true })
  arrangement: WorkArrangement;

  @Column({ default: JobStatus.Hiring })
  status: JobStatus;

  @Column({ nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  expired_date: Date;

  @Column()
  province_id: number;

  @Column({ nullable: true })
  occupation_id: number;

  @Column()
  @Index()
  @ApiProperty()
  slug: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.jobs)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;

  @Column()
  enterprise_id: number;

  @ManyToOne(() => Province, (province) => province.jobs)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @ManyToOne(() => Occupation, (occupation) => occupation.jobs, {
    nullable: true,
  })
  @JoinColumn({ name: 'occupation_id' })
  occupation: Occupation;

  @OneToMany(() => SavedJob, (saved) => saved.job, { cascade: true })
  @ApiProperty({
    isArray: true,
    required: false,
  })
  saves: SavedJob[];

  @OneToMany(() => Applicant, (applicant) => applicant.job)
  applicants: Applicant[];

  @IsOptional()
  @Type(() => Number)
  total_applicants?: number;

  @IsOptional()
  @Type(() => Number)
  total_saves?: number;

  @IsOptional()
  @Type(() => Boolean)
  saved?: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  genSlug() {
    this.slug = Utils.toSlug(this.title);
  }
}
