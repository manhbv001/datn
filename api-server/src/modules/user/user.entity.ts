import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import BaseEntity from 'src/shared/entities/base.entity';
import { UploadFolders } from 'src/shared/enum/upload-folders.enum';
import { Utils } from 'src/utils/data.util';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApplicantProfile } from '../applicant-profile/applicant-profile.entity';
import { Enterprise } from '../enterprise/enterprise.entity';
import { Post } from '../post/post.entity';
import { Resume } from '../resume/resume.entity';
import { UserTypes } from './user.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 255 })
  @ApiProperty()
  fullname: string;

  @Column({ length: 255, unique: true })
  @ApiProperty()
  email: string;

  @Column({ length: 255, unique: true, nullable: true })
  @ApiProperty({ required: false })
  username: string;

  @Column({ length: 20, nullable: true })
  @ApiProperty({ required: false })
  phone: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  enterprise_id: number;

  @Column({ default: UserTypes.Applicant })
  @ApiProperty({ enum: UserTypes, default: UserTypes.Applicant })
  type: UserTypes;

  @Column({ default: false })
  @ApiProperty({ default: false })
  is_super: boolean;

  @Column({ nullable: true, default: '/default-user.png' })
  @ApiProperty({ required: false })
  avatar_url: string;

  @ManyToOne(() => Enterprise)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;

  @Column({ nullable: true })
  applicant_profile_id: number;

  @OneToOne(() => ApplicantProfile, (profile) => profile.user)
  @JoinColumn({ name: 'applicant_profile_id' })
  applicantProfile: ApplicantProfile;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @ManyToMany(() => User, (user) => user.followings)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  followings: User[];

  @BeforeInsert()
  @BeforeUpdate()
  hashInsertedPassword() {
    this.password = Utils.encodeString(this.password);
  }

  @AfterLoad()
  loadAvatarUrl() {
    if (this.avatar_url && this.avatar_url.startsWith(UploadFolders.Avatar)) {
      this.avatar_url = `${process.env.AWS_S3_STATIC_ENDPOINT}/${this.avatar_url}`;
    }
  }
}
