import BaseEntity from 'src/shared/entities/base.entity';
import { ApplicantLevel } from 'src/shared/enum/applicant-level.enum';
import { Education } from 'src/shared/enum/education.enum';
import { Gender } from 'src/shared/enum/gender.enum';
import { WorkArrangement } from 'src/shared/enum/job-arrangement.enum';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Occupation } from '../occupation/occupation.entity';
import { Province } from '../province/province.entity';
import { User } from '../user/user.entity';

@Entity('applicant_profiles')
export class ApplicantProfile extends BaseEntity {
  @Column()
  user_id: number;

  @Column()
  display_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  level: ApplicantLevel;

  @Column()
  education: Education;

  @Column('datetime')
  date_of_birth: Date;

  @Column()
  province_id: number;

  @Column()
  gender: Gender;

  @Column()
  work_arrangement: WorkArrangement;

  @Column()
  salary_from: number;

  @Column()
  salary_to: number;

  @Column()
  expect_level: ApplicantLevel;

  @Column({ default: true })
  finding_job: boolean;

  @ManyToMany(() => Occupation, (occupation) => occupation.applicantProfiles)
  @JoinTable()
  occupations: Occupation[];

  @ManyToMany(() => Province, (province) => province.applicantProfiles)
  @JoinTable()
  workProvinces: Province[];

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @OneToOne(() => User, (user) => user.applicantProfile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
