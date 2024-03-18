import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from 'src/shared/entities/base.entity';
import { UploadFolders } from 'src/shared/enum/upload-folders.enum';
import { Utils } from 'src/utils/data.util';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
} from 'typeorm';
import { Job } from '../job/job.entity';

@Entity('enterprises')
export class Enterprise extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ nullable: true })
  address: string;

  @Column('text', { nullable: true })
  @ApiProperty({ nullable: true })
  logo: string;

  @Column('text', { nullable: true })
  @ApiProperty({ nullable: true })
  cover: string;

  @Column()
  @ApiProperty()
  @Index()
  slug: string;

  @Column('text', { nullable: true })
  @ApiProperty({ nullable: true })
  description: string;

  @OneToMany(() => Job, (job) => job.enterprise)
  jobs: Job[];

  @BeforeInsert()
  @BeforeUpdate()
  genSlug() {
    this.slug = Utils.toSlug(this.name);
  }

  @AfterLoad()
  loadImages() {
    if (this.logo && this.logo.startsWith(UploadFolders.Thumbnail)) {
      this.logo = `${process.env.AWS_S3_STATIC_ENDPOINT}/${this.logo}`;
    }

    if (this.cover && this.cover.startsWith(UploadFolders.Thumbnail)) {
      this.cover = `${process.env.AWS_S3_STATIC_ENDPOINT}/${this.cover}`;
    }
  }
}
